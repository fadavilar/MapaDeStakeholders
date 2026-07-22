/**
 * Persistencia local (localStorage), plantilla/carga desde Excel (XLSX)
 * y exportación a Excel (XLSX) y a reporte HTML autocontenido.
 */
const STORAGE_KEY = 'mapa-stakeholders-v1';

function cargarStakeholders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : null;
  } catch (e) {
    console.warn('No se pudo leer localStorage:', e);
    return null;
  }
}

function guardarStakeholders(stakeholders) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stakeholders));
  } catch (e) {
    console.warn('No se pudo guardar en localStorage:', e);
  }
}

function descargarArchivo(contenido, nombreArchivo, tipoMime) {
  const blob = contenido instanceof Blob ? contenido : new Blob([contenido], { type: tipoMime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombreArchivo;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const ENCABEZADOS_XLSX = ['Nombre', 'Categoría', 'Influencia (0-10)', 'Interés (0-10)', 'Impacto (1-10)', 'Notas'];

function exportarXLSX(stakeholders) {
  const filas = stakeholders.map((s) => [
    s.nombre,
    getCategoria(s.categoria).label,
    s.influencia,
    s.interes,
    s.tamano,
    s.notas || '',
  ]);
  const hoja = XLSX.utils.aoa_to_sheet([ENCABEZADOS_XLSX, ...filas]);
  hoja['!cols'] = [{ wch: 34 }, { wch: 30 }, { wch: 16 }, { wch: 16 }, { wch: 14 }, { wch: 45 }];

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, 'Actores');

  const buffer = XLSX.write(libro, { bookType: 'xlsx', type: 'array' });
  const fecha = new Date().toISOString().slice(0, 10);
  descargarArchivo(
    new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    `mapa-stakeholders-${fecha}.xlsx`
  );
}

function normalizarTextoCategoria(texto) {
  return String(texto || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function resolverCategoria(valor) {
  const texto = normalizarTextoCategoria(valor);
  const porId = CATEGORIAS.find((c) => c.id === texto);
  if (porId) return porId.id;
  const porLabel = CATEGORIAS.find((c) => normalizarTextoCategoria(c.label) === texto);
  if (porLabel) return porLabel.id;
  return 'otros';
}

function importarXLSX(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const libro = XLSX.read(reader.result, { type: 'array' });
        const nombreHoja = libro.SheetNames.includes('Actores') ? 'Actores' : libro.SheetNames[0];
        const hoja = libro.Sheets[nombreHoja];
        const filas = XLSX.utils.sheet_to_json(hoja, { header: 1, defval: '' });

        const datos = filas
          .slice(1)
          .filter((fila) => fila[0] && String(fila[0]).trim())
          .map((fila) => ({
            nombre: String(fila[0]).trim(),
            categoria: resolverCategoria(fila[1]),
            influencia: Math.max(0, Math.min(10, Number(fila[2]) || 0)),
            interes: Math.max(0, Math.min(10, Number(fila[3]) || 0)),
            tamano: Math.max(1, Math.min(10, Number(fila[4]) || 5)),
            notas: fila[5] ? String(fila[5]).trim() : '',
          }));

        if (datos.length === 0) throw new Error('El archivo no contiene filas de actores válidas.');
        resolve(datos);
      } catch (e) {
        reject(e);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

function jsonParaScript(valor) {
  return JSON.stringify(valor).replace(/</g, '\\u003c');
}

function construirReporteHTML(stakeholders) {
  const fecha = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  const filas = stakeholders
    .slice()
    .sort((a, b) => b.influencia * b.interes - a.influencia * a.interes)
    .map((s) => {
      const cat = getCategoria(s.categoria);
      return `<tr>
        <td><span style="display:inline-block;padding:3px 9px;border-radius:999px;background:${cat.color};color:#fff;font-size:12px;font-weight:600;white-space:nowrap;">${cat.label}</span></td>
        <td style="font-weight:600;">${escaparHTMLTexto(s.nombre)}</td>
        <td style="text-align:center;">${s.influencia}</td>
        <td style="text-align:center;">${s.interes}</td>
        <td>${escaparHTMLTexto(s.notas || '')}</td>
      </tr>`;
    })
    .join('\n');

  const categoriasUsadas = CATEGORIAS.filter((c) => stakeholders.some((s) => s.categoria === c.id));
  const datosGrafico = jsonParaScript(
    stakeholders.map((s) => ({
      x: s.interes,
      y: s.influencia,
      tamano: s.tamano,
      categoria: s.categoria,
      nombre: s.nombre,
      notas: s.notas,
    }))
  );
  const datosCategorias = jsonParaScript(categoriasUsadas);

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Mapa de Stakeholders — Reporte</title>
<style>
  body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 24px; color: #1a1f29; background: #f4f6f9; }
  .contenedor { max-width: 1100px; margin: 0 auto; background: #fff; border: 1px solid #dfe4ea; border-radius: 12px; padding: 28px 32px; }
  h1 { margin-top: 0; font-size: 1.5rem; }
  .fecha { color: #5a6472; font-size: 0.9rem; margin-top: -8px; }
  table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 0.9rem; }
  th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #dfe4ea; }
  th { color: #5a6472; font-weight: 600; }
  .grafico-contenedor { position: relative; height: 480px; width: 100%; margin-top: 16px; }
  .leyenda-grafico { display: flex; flex-wrap: wrap; gap: 8px 16px; margin-top: 14px; padding-top: 12px; border-top: 1px solid #dfe4ea; }
  .item-leyenda { display: inline-flex; align-items: center; gap: 6px; font-size: 0.78rem; color: #5a6472; }
  .punto-leyenda { flex-shrink: 0; width: 10px; height: 10px; border-radius: 50%; }
  .aviso-sin-grafico { display: none; color: #b3261e; font-size: 0.85rem; margin-top: 10px; }
  footer { margin-top: 24px; color: #5a6472; font-size: 0.8rem; }
  @media (prefers-color-scheme: dark) {
    body { background: #12161f; color: #e8ebf0; }
    .contenedor { background: #1a2029; border-color: #2b3340; }
    th, td { border-color: #2b3340; }
  }
</style>
</head>
<body>
  <div class="contenedor">
    <h1>🗺️ Mapa de Stakeholders</h1>
    <p class="fecha">Generado el ${fecha} · ${stakeholders.length} actor(es)</p>
    <div class="grafico-contenedor"><canvas id="grafico-reporte"></canvas></div>
    <div id="leyenda-reporte" class="leyenda-grafico"></div>
    <p id="aviso-sin-grafico" class="aviso-sin-grafico">
      No se pudo cargar la librería del gráfico (Chart.js vía CDN) — probablemente no hay
      conexión a internet. La tabla de actores más abajo sigue disponible.
    </p>
    <table>
      <thead>
        <tr><th>Categoría</th><th>Actor</th><th>Influencia</th><th>Interés</th><th>Notas</th></tr>
      </thead>
      <tbody>
        ${filas}
      </tbody>
    </table>
    <footer>
      Reporte generado con Mapa de Stakeholders (github.com/fadavilar/MapaDeStakeholders).
      Herramienta académica de código abierto; los valores de influencia/interés son
      subjetivos y deben interpretarse en el contexto específico del análisis. El gráfico
      es interactivo (pase el cursor sobre una burbuja para ver detalles); requiere
      conexión a internet para cargar Chart.js desde su CDN.
    </footer>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js" onerror="document.getElementById('aviso-sin-grafico').style.display='block'"></script>
  <script>
    (function () {
      var puntos = ${datosGrafico};
      var categorias = ${datosCategorias};

      function radioBurbuja(tamano) {
        var t = Math.max(1, Math.min(10, Number(tamano) || 5));
        return 6 + (t - 1) * ((20 - 6) / 9);
      }

      function iniciar() {
        if (typeof Chart === 'undefined') {
          document.getElementById('aviso-sin-grafico').style.display = 'block';
          return;
        }

        var porCategoria = {};
        puntos.forEach(function (p) {
          if (!porCategoria[p.categoria]) porCategoria[p.categoria] = [];
          porCategoria[p.categoria].push(p);
        });

        var datasets = categorias.map(function (cat) {
          return {
            label: cat.label,
            backgroundColor: cat.color + 'b3',
            borderColor: cat.color,
            borderWidth: 1.5,
            data: (porCategoria[cat.id] || []).map(function (p) {
              return { x: p.x, y: p.y, r: radioBurbuja(p.tamano), nombre: p.nombre, notas: p.notas };
            }),
          };
        });

        var leyenda = document.getElementById('leyenda-reporte');
        leyenda.innerHTML = categorias
          .map(function (cat) {
            return '<span class="item-leyenda"><span class="punto-leyenda" style="background:' + cat.color + '"></span>' + cat.label + '</span>';
          })
          .join('');

        var pluginCuadrantes = {
          id: 'pluginCuadrantes',
          beforeDraw: function (chart) {
            var chartArea = chart.chartArea;
            if (!chartArea) return;
            var ctx = chart.ctx;
            var left = chartArea.left, right = chartArea.right, top = chartArea.top, bottom = chartArea.bottom;
            var xMid = chart.scales.x.getPixelForValue(5);
            var yMid = chart.scales.y.getPixelForValue(5);
            ctx.save();
            ctx.fillStyle = 'rgba(76,175,80,0.09)';
            ctx.fillRect(xMid, top, right - xMid, yMid - top);
            ctx.fillStyle = 'rgba(255,193,7,0.10)';
            ctx.fillRect(left, top, xMid - left, yMid - top);
            ctx.fillStyle = 'rgba(33,150,243,0.07)';
            ctx.fillRect(xMid, yMid, right - xMid, bottom - yMid);
            ctx.fillStyle = 'rgba(158,158,158,0.08)';
            ctx.fillRect(left, yMid, xMid - left, bottom - yMid);
            ctx.strokeStyle = 'rgba(0,0,0,0.2)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(xMid, top); ctx.lineTo(xMid, bottom);
            ctx.moveTo(left, yMid); ctx.lineTo(right, yMid);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.font = '600 12px system-ui, sans-serif';
            ctx.fillStyle = 'rgba(0,0,0,0.45)';
            var pad = 10;
            ctx.textBaseline = 'top'; ctx.textAlign = 'right';
            ctx.fillText('JUGADORES CLAVE', right - pad, top + pad);
            ctx.textAlign = 'left';
            ctx.fillText('MANTENER SATISFECHOS', left + pad, top + pad);
            ctx.textBaseline = 'bottom'; ctx.textAlign = 'right';
            ctx.fillText('MANTENER INFORMADOS', right - pad, bottom - pad);
            ctx.textAlign = 'left';
            ctx.fillText('MONITOREAR', left + pad, bottom - pad);
            ctx.restore();
          },
        };

        new Chart(document.getElementById('grafico-reporte'), {
          type: 'bubble',
          data: { datasets: datasets },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            clip: false,
            layout: { padding: { top: 30, right: 26, bottom: 6, left: 6 } },
            scales: {
              x: { min: 0, max: 10, title: { display: true, text: 'Interés →', font: { weight: '600' } }, ticks: { stepSize: 1 } },
              y: { min: 0, max: 10, title: { display: true, text: 'Influencia →', font: { weight: '600' } }, ticks: { stepSize: 1 } },
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  title: function (items) { return (items[0] && items[0].raw && items[0].raw.nombre) || ''; },
                  label: function (item) {
                    var r = item.raw;
                    var lineas = ['Influencia: ' + r.y + '/10 · Interés: ' + r.x + '/10'];
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

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
      } else {
        iniciar();
      }
    })();
  </script>
</body>
</html>`;
}

function escaparHTMLTexto(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function exportarHTML(stakeholders) {
  const html = construirReporteHTML(stakeholders);
  const fecha = new Date().toISOString().slice(0, 10);
  descargarArchivo(html, `mapa-stakeholders-${fecha}.html`, 'text/html;charset=utf-8');
}
