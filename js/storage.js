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

function construirReporteHTML(stakeholders, imagenGraficoDataUrl) {
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

  const imagenHTML = imagenGraficoDataUrl
    ? `<img src="${imagenGraficoDataUrl}" alt="Mapa de cuadrantes" style="max-width:100%;border:1px solid #dfe4ea;border-radius:10px;" />`
    : '<p><em>Gráfico no disponible.</em></p>';

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Mapa de Stakeholders — Reporte</title>
<style>
  body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 24px; color: #1a1f29; background: #f4f6f9; }
  .contenedor { max-width: 960px; margin: 0 auto; background: #fff; border: 1px solid #dfe4ea; border-radius: 12px; padding: 28px 32px; }
  h1 { margin-top: 0; font-size: 1.5rem; }
  .fecha { color: #5a6472; font-size: 0.9rem; margin-top: -8px; }
  table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 0.9rem; }
  th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #dfe4ea; }
  th { color: #5a6472; font-weight: 600; }
  .grafico { margin-top: 20px; text-align: center; }
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
    <div class="grafico">${imagenHTML}</div>
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
      subjetivos y deben interpretarse en el contexto específico del análisis.
    </footer>
  </div>
</body>
</html>`;
}

function escaparHTMLTexto(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function exportarHTML(stakeholders, imagenGraficoDataUrl) {
  const html = construirReporteHTML(stakeholders, imagenGraficoDataUrl);
  const fecha = new Date().toISOString().slice(0, 10);
  descargarArchivo(html, `mapa-stakeholders-${fecha}.html`, 'text/html;charset=utf-8');
}
