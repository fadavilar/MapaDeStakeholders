/**
 * Renderizado del bubble chart de influencia (eje Y) vs. interés (eje X)
 * dividido en cuatro cuadrantes (matriz de poder-interés).
 */
let graficoStakeholders = null;

const ESCALA_MIN = 0;
const ESCALA_MAX = 10;
const PUNTO_MEDIO = 5;

const pluginCuadrantes = {
  id: 'pluginCuadrantes',
  beforeDraw(chart) {
    const { ctx, chartArea, scales } = chart;
    if (!chartArea) return;
    const { left, right, top, bottom } = chartArea;
    const xMid = scales.x.getPixelForValue(PUNTO_MEDIO);
    const yMid = scales.y.getPixelForValue(PUNTO_MEDIO);
    const oscuro = document.documentElement.classList.contains('tema-oscuro');

    ctx.save();

    const colores = oscuro
      ? ['rgba(76,175,80,0.10)', 'rgba(255,193,7,0.08)', 'rgba(33,150,243,0.06)', 'rgba(158,158,158,0.06)']
      : ['rgba(76,175,80,0.09)', 'rgba(255,193,7,0.10)', 'rgba(33,150,243,0.07)', 'rgba(158,158,158,0.08)'];

    ctx.fillStyle = colores[0];
    ctx.fillRect(xMid, top, right - xMid, yMid - top);
    ctx.fillStyle = colores[1];
    ctx.fillRect(left, top, xMid - left, yMid - top);
    ctx.fillStyle = colores[2];
    ctx.fillRect(xMid, yMid, right - xMid, bottom - yMid);
    ctx.fillStyle = colores[3];
    ctx.fillRect(left, yMid, xMid - left, bottom - yMid);

    ctx.strokeStyle = oscuro ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(xMid, top);
    ctx.lineTo(xMid, bottom);
    ctx.moveTo(left, yMid);
    ctx.lineTo(right, yMid);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = '600 12px system-ui, sans-serif';
    ctx.fillStyle = oscuro ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)';
    const pad = 10;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'right';
    ctx.fillText('JUGADORES CLAVE', right - pad, top + pad);
    ctx.textAlign = 'left';
    ctx.fillText('MANTENER SATISFECHOS', left + pad, top + pad);
    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'right';
    ctx.fillText('MANTENER INFORMADOS', right - pad, bottom - pad);
    ctx.textAlign = 'left';
    ctx.fillText('MONITOREAR', left + pad, bottom - pad);

    ctx.restore();
  },
};

function radioBurbuja(tamano) {
  const t = Math.max(1, Math.min(10, Number(tamano) || 5));
  return 6 + (t - 1) * ((20 - 6) / 9);
}

function construirDatasets(stakeholders) {
  const porCategoria = new Map();
  stakeholders.forEach((s) => {
    if (!porCategoria.has(s.categoria)) porCategoria.set(s.categoria, []);
    porCategoria.get(s.categoria).push(s);
  });

  return Array.from(porCategoria.entries()).map(([catId, items]) => {
    const cat = getCategoria(catId);
    return {
      label: cat.label,
      backgroundColor: cat.color + 'b3',
      borderColor: cat.color,
      borderWidth: 1.5,
      data: items.map((s) => ({
        x: s.interes,
        y: s.influencia,
        r: radioBurbuja(s.tamano),
        tamano: s.tamano,
        nombre: s.nombre,
        notas: s.notas,
      })),
    };
  });
}

function renderizarLeyenda(stakeholders) {
  const contenedor = document.getElementById('leyenda-grafico');
  if (!contenedor) return;

  const idsPresentes = [];
  stakeholders.forEach((s) => {
    if (!idsPresentes.includes(s.categoria)) idsPresentes.push(s.categoria);
  });

  if (idsPresentes.length === 0) {
    contenedor.innerHTML = '';
    return;
  }

  contenedor.innerHTML = idsPresentes
    .map((id) => {
      const cat = getCategoria(id);
      return `<span class="item-leyenda"><span class="punto-leyenda" style="background:${cat.color}"></span>${cat.label}</span>`;
    })
    .join('');
}

function renderizarGrafico(stakeholders) {
  const ctx = document.getElementById('grafico-stakeholders');
  const datasets = construirDatasets(stakeholders);
  renderizarLeyenda(stakeholders);

  if (graficoStakeholders) {
    graficoStakeholders.data.datasets = datasets;
    graficoStakeholders.update();
    return;
  }

  graficoStakeholders = new Chart(ctx, {
    type: 'bubble',
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      clip: false,
      layout: { padding: { top: 30, right: 26, bottom: 6, left: 6 } },
      scales: {
        x: {
          min: ESCALA_MIN,
          max: ESCALA_MAX,
          title: { display: true, text: 'Interés →', font: { weight: '600' } },
          ticks: { stepSize: 1 },
          grid: { color: 'rgba(128,128,128,0.15)' },
        },
        y: {
          min: ESCALA_MIN,
          max: ESCALA_MAX,
          title: { display: true, text: 'Influencia →', font: { weight: '600' } },
          ticks: { stepSize: 1 },
          grid: { color: 'rgba(128,128,128,0.15)' },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: (items) => items[0]?.raw?.nombre ?? '',
            label: (item) => {
              const r = item.raw;
              const lineas = [`Influencia: ${r.y}/10 · Interés: ${r.x}/10 · Impacto: ${r.tamano}/10`];
              if (r.notas) lineas.push(r.notas);
              return lineas;
            },
          },
        },
      },
    },
    plugins: [pluginCuadrantes],
  });
}

function obtenerImagenGrafico() {
  if (!graficoStakeholders) return null;
  return graficoStakeholders.toBase64Image('image/png', 1);
}

function exportarGraficoPNG() {
  const url = obtenerImagenGrafico();
  if (!url) return;
  const a = document.createElement('a');
  a.href = url;
  a.download = `mapa-stakeholders-${new Date().toISOString().slice(0, 10)}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
