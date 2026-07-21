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

function cargarDatasetEjemplo() {
  const reemplazar =
    stakeholders.length === 0 ||
    confirm('Esto reemplazará los actores actuales por el conjunto de ejemplo. ¿Continuar?');
  if (!reemplazar) return;
  stakeholders = DATASET_EJEMPLO.map((s) => ({ id: generarId(), ...s }));
  persistirYRenderizar();
}

function limpiarTodo() {
  if (stakeholders.length === 0) return;
  if (!confirm('Esto eliminará todos los actores del mapa actual. ¿Continuar?')) return;
  stakeholders = [];
  limpiarFormulario();
  persistirYRenderizar();
}

async function manejarImportarJSON(evento) {
  const file = evento.target.files[0];
  if (!file) return;
  try {
    const data = await importarJSON(file);
    const normalizados = data
      .filter((s) => s && s.nombre)
      .map((s) => ({
        id: generarId(),
        nombre: String(s.nombre),
        categoria: CATEGORIAS.some((c) => c.id === s.categoria) ? s.categoria : 'otros',
        influencia: Math.max(0, Math.min(10, Number(s.influencia) || 5)),
        interes: Math.max(0, Math.min(10, Number(s.interes) || 5)),
        tamano: Math.max(1, Math.min(10, Number(s.tamano) || 5)),
        notas: s.notas ? String(s.notas) : '',
      }));
    if (normalizados.length === 0) throw new Error('El archivo no contiene actores válidos.');
    stakeholders = normalizados;
    persistirYRenderizar();
  } catch (e) {
    alert(`No se pudo importar el archivo: ${e.message}`);
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

function inicializar() {
  poblarSelectCategorias();
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

  document.getElementById('btn-ejemplo').addEventListener('click', cargarDatasetEjemplo);
  document.getElementById('btn-limpiar-todo').addEventListener('click', limpiarTodo);
  document.getElementById('btn-exportar-json').addEventListener('click', () => exportarJSON(stakeholders));
  document.getElementById('btn-exportar-csv').addEventListener('click', () => exportarCSV(stakeholders));
  document.getElementById('btn-exportar-png').addEventListener('click', exportarGraficoPNG);
  document.getElementById('input-importar-json').addEventListener('change', manejarImportarJSON);
  document.getElementById('btn-importar-json').addEventListener('click', () => {
    document.getElementById('input-importar-json').click();
  });
}

document.addEventListener('DOMContentLoaded', inicializar);
