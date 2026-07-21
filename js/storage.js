/**
 * Persistencia local (localStorage) e importación/exportación de datos.
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
  const blob = new Blob([contenido], { type: tipoMime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombreArchivo;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportarJSON(stakeholders) {
  const fecha = new Date().toISOString().slice(0, 10);
  descargarArchivo(
    JSON.stringify(stakeholders, null, 2),
    `mapa-stakeholders-${fecha}.json`,
    'application/json'
  );
}

function exportarCSV(stakeholders) {
  const encabezados = ['nombre', 'categoria', 'influencia', 'interes', 'tamano', 'notas'];
  const escapar = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const filas = stakeholders.map((s) => encabezados.map((c) => escapar(s[c])).join(','));
  const csv = [encabezados.join(','), ...filas].join('\r\n');
  const fecha = new Date().toISOString().slice(0, 10);
  descargarArchivo('﻿' + csv, `mapa-stakeholders-${fecha}.csv`, 'text/csv;charset=utf-8');
}

function importarJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data)) throw new Error('El archivo no contiene una lista de actores.');
        resolve(data);
      } catch (e) {
        reject(e);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file, 'utf-8');
  });
}
