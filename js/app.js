/**
 * Lógica principal: estado en memoria, formulario CRUD, tabla y eventos.
 */
let stakeholders = [];
let editandoId = null;

function generarId() {
  return `sh_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function poblarSelectCategorias() {
  const select = document.getElementById('categoria');
  select.innerHTML = CATEGORIAS.map(
    (c) => `<option value="${c.id}">${c.label}</option>`
  ).join('');
}

function poblarSelectPaises() {
  const select = document.getElementById('selector-pais');
  select.innerHTML = PAISES.map((p) => `<option value="${p.id}">${p.label}</option>`).join('');
}

function actualizarValoresSlider() {
  document.getElementById('influencia-valor').textContent = document.getElementById('influencia').value;
  document.getElementById('interes-valor').textContent = document.getElementById('interes').value;
  document.getElementById('tamano-valor').textContent = document.getElementById('tamano').value;
}

function persistirYRenderizar() {
  guardarStakeholders(stakeholders);
  renderizarTabla();
  renderizarGrafico(stakeholders);
  actualizarContador();
}

function actualizarContador() {
  const el = document.getElementById('contador-actores');
  el.textContent = stakeholders.length === 1 ? '1 actor' : `${stakeholders.length} actores`;
}

function renderizarTabla() {
  const cuerpo = document.getElementById('cuerpo-tabla');
  const vacio = document.getElementById('tabla-vacia');

  if (stakeholders.length === 0) {
    cuerpo.innerHTML = '';
    vacio.style.display = 'block';
    return;
  }
  vacio.style.display = 'none';

  cuerpo.innerHTML = stakeholders
    .slice()
    .sort((a, b) => b.influencia * b.interes - a.influencia * a.interes)
    .map((s) => {
      const cat = getCategoria(s.categoria);
      return `
        <tr data-id="${s.id}">
          <td><span class="chip" style="--chip-color:${cat.color}">${cat.label}</span></td>
          <td class="celda-nombre">${escaparHTML(s.nombre)}</td>
          <td class="celda-num">${s.influencia}</td>
          <td class="celda-num">${s.interes}</td>
          <td class="celda-acciones">
            <button type="button" class="btn-icono" data-accion="editar" title="Editar">✏️</button>
            <button type="button" class="btn-icono" data-accion="eliminar" title="Eliminar">🗑️</button>
          </td>
        </tr>`;
    })
    .join('');
}

function escaparHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function leerFormulario() {
  return {
    nombre: document.getElementById('nombre').value.trim(),
    categoria: document.getElementById('categoria').value,
    influencia: Number(document.getElementById('influencia').value),
    interes: Number(document.getElementById('interes').value),
    tamano: Number(document.getElementById('tamano').value),
    notas: document.getElementById('notas').value.trim(),
  };
}

function limpiarFormulario() {
  document.getElementById('form-stakeholder').reset();
  document.getElementById('influencia').value = 5;
  document.getElementById('interes').value = 5;
  document.getElementById('tamano').value = 5;
  actualizarValoresSlider();
  editandoId = null;
  document.getElementById('btn-guardar').textContent = 'Agregar actor';
  document.getElementById('btn-cancelar-edicion').hidden = true;
  document.getElementById('nombre').focus();
}

function cargarEnFormulario(s) {
  document.getElementById('nombre').value = s.nombre;
  document.getElementById('categoria').value = s.categoria;
  document.getElementById('influencia').value = s.influencia;
  document.getElementById('interes').value = s.interes;
  document.getElementById('tamano').value = s.tamano;
  document.getElementById('notas').value = s.notas || '';
  actualizarValoresSlider();
  editandoId = s.id;
  document.getElementById('btn-guardar').textContent = 'Guardar cambios';
  document.getElementById('btn-cancelar-edicion').hidden = false;
  document.getElementById('nombre').focus();
  document.getElementById('form-stakeholder').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function manejarEnvioFormulario(evento) {
  evento.preventDefault();
  const datos = leerFormulario();
  if (!datos.nombre) return;

  if (editandoId) {
    const idx = stakeholders.findIndex((s) => s.id === editandoId);
    if (idx !== -1) stakeholders[idx] = { ...stakeholders[idx], ...datos };
  } else {
    stakeholders.push({ id: generarId(), ...datos });
  }
  persistirYRenderizar();
  limpiarFormulario();
}

function manejarClicTabla(evento) {
  const boton = evento.target.closest('button[data-accion]');
  if (!boton) return;
  const fila = evento.target.closest('tr[data-id]');
  const id = fila.dataset.id;
  const s = stakeholders.find((x) => x.id === id);
  if (!s) return;

  if (boton.dataset.accion === 'editar') {
    cargarEnFormulario(s);
  } else if (boton.dataset.accion === 'eliminar') {
    if (confirm(`¿Eliminar "${s.nombre}" del mapa?`)) {
      stakeholders = stakeholders.filter((x) => x.id !== id);
      if (editandoId === id) limpiarFormulario();
      persistirYRenderizar();
    }
  }
}

function actualizarNotaRegulatoria() {
  const nota = document.getElementById('nota-regulatoria');
  if (!nota) return;
  const paisId = document.getElementById('selector-pais').value;
  const enlaces = REFERENCIAS_POR_PAIS[paisId] || [];
  if (enlaces.length === 0) {
    nota.innerHTML = '';
    return;
  }
  const pais = PAISES.find((p) => p.id === paisId);
  const enlacesHTML = enlaces
    .map((e) => `<a href="${e.url}" target="_blank" rel="noopener">${escaparHTML(e.label)}</a>`)
    .join(' · ');
  nota.innerHTML = `📎 Fuentes oficiales para ${pais ? pais.label : ''}: ${enlacesHTML}`;
}

function cargarDatasetEjemplo() {
  const paisId = document.getElementById('selector-pais').value;
  const dataset = DATASETS_EJEMPLO[paisId];
  if (!dataset) return;
  const reemplazar =
    stakeholders.length === 0 ||
    confirm('Esto reemplazará los actores actuales por el conjunto de ejemplo. ¿Continuar?');
  if (!reemplazar) return;
  stakeholders = dataset.map((s) => ({ id: generarId(), ...s }));
  persistirYRenderizar();
}

function limpiarTodo() {
  if (stakeholders.length === 0) return;
  if (!confirm('Esto eliminará todos los actores del mapa actual. ¿Continuar?')) return;
  stakeholders = [];
  limpiarFormulario();
  persistirYRenderizar();
}

function libreriaXLSXDisponible() {
  if (typeof XLSX !== 'undefined') return true;
  alert(
    'No se pudo cargar la librería para leer/escribir Excel (SheetJS). ' +
      'Verifica tu conexión a internet o que un bloqueador de contenido no esté ' +
      'impidiendo la carga de cdnjs.cloudflare.com, y vuelve a intentarlo.'
  );
  return false;
}

async function manejarImportarXLSX(evento) {
  const file = evento.target.files[0];
  if (!file) return;
  if (!libreriaXLSXDisponible()) {
    evento.target.value = '';
    return;
  }
  try {
    const datos = await importarXLSX(file);
    const reemplazar =
      stakeholders.length === 0 ||
      confirm(`Se encontraron ${datos.length} actor(es) en el archivo. Esto reemplazará los actores actuales. ¿Continuar?`);
    if (!reemplazar) return;
    stakeholders = datos.map((s) => ({ id: generarId(), ...s }));
    persistirYRenderizar();
  } catch (e) {
    alert(`No se pudo cargar el archivo: ${e.message}`);
  } finally {
    evento.target.value = '';
  }
}

function inicializarTema() {
  const btn = document.getElementById('btn-tema');
  const preferenciaGuardada = localStorage.getItem('mapa-stakeholders-tema');
  const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const oscuro = preferenciaGuardada ? preferenciaGuardada === 'oscuro' : prefiereOscuro;
  document.documentElement.classList.toggle('tema-oscuro', oscuro);
  btn.textContent = oscuro ? '☀️' : '🌙';

  btn.addEventListener('click', () => {
    const activo = document.documentElement.classList.toggle('tema-oscuro');
    btn.textContent = activo ? '☀️' : '🌙';
    localStorage.setItem('mapa-stakeholders-tema', activo ? 'oscuro' : 'claro');
    if (graficoStakeholders) graficoStakeholders.update();
  });
}

function inicializarPanelMetodologia() {
  const btn = document.getElementById('btn-metodologia');
  const panel = document.getElementById('panel-metodologia');
  btn.addEventListener('click', () => {
    const abierto = panel.hasAttribute('open');
    if (!abierto) panel.setAttribute('open', '');
    else panel.removeAttribute('open');
  });
}

function manejarExportarHTML() {
  exportarHTML(stakeholders);
}

function manejarExportarXLSX() {
  if (!libreriaXLSXDisponible()) return;
  exportarXLSX(stakeholders);
}

function inicializar() {
  poblarSelectCategorias();
  poblarSelectPaises();
  inicializarTema();
  inicializarPanelMetodologia();

  const guardados = cargarStakeholders();
  stakeholders = guardados && guardados.length ? guardados : [];

  actualizarValoresSlider();
  persistirYRenderizar();

  document.getElementById('form-stakeholder').addEventListener('submit', manejarEnvioFormulario);
  document.getElementById('btn-cancelar-edicion').addEventListener('click', limpiarFormulario);
  document.getElementById('cuerpo-tabla').addEventListener('click', manejarClicTabla);
  document.getElementById('influencia').addEventListener('input', actualizarValoresSlider);
  document.getElementById('interes').addEventListener('input', actualizarValoresSlider);
  document.getElementById('tamano').addEventListener('input', actualizarValoresSlider);

  document.getElementById('selector-pais').addEventListener('change', () => {
    actualizarNotaRegulatoria();
    cargarDatasetEjemplo();
  });
  actualizarNotaRegulatoria();
  document.getElementById('btn-ejemplo').addEventListener('click', cargarDatasetEjemplo);
  document.getElementById('btn-limpiar-todo').addEventListener('click', limpiarTodo);
  document.getElementById('btn-exportar-xlsx').addEventListener('click', manejarExportarXLSX);
  document.getElementById('btn-exportar-html').addEventListener('click', manejarExportarHTML);
  document.getElementById('btn-exportar-png').addEventListener('click', exportarGraficoPNG);
  document.getElementById('input-importar-xlsx').addEventListener('change', manejarImportarXLSX);
  document.getElementById('btn-importar-xlsx').addEventListener('click', () => {
    if (!libreriaXLSXDisponible()) return;
    document.getElementById('input-importar-xlsx').click();
  });
}

document.addEventListener('DOMContentLoaded', inicializar);

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (graficoStakeholders) graficoStakeholders.resize();
  }, 150);
});
