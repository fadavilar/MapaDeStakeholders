/**
 * Categorías de actores del sistema de salud colombiano relevantes
 * para el análisis de stakeholders de la industria farmacéutica.
 */
const CATEGORIAS = [
  { id: 'gobierno', label: 'Gobierno / Ente rector', ejemplo: 'Ministerio de Salud y Protección Social', color: '#1f4e8c' },
  { id: 'regulacion', label: 'Regulación sanitaria', ejemplo: 'INVIMA', color: '#6a4fa3' },
  { id: 'aseguramiento', label: 'Aseguramiento', ejemplo: 'EPS, ADRES', color: '#1a8f5e' },
  { id: 'prestacion', label: 'Prestación de servicios', ejemplo: 'IPS, hospitales, clínicas', color: '#d17a1f' },
  { id: 'control', label: 'Entes de control', ejemplo: 'Supersalud, Procuraduría, Contraloría', color: '#b3261e' },
  { id: 'evaluacion', label: 'Evaluación de tecnologías', ejemplo: 'IETS', color: '#0f9aa8' },
  { id: 'alto_costo', label: 'Gestión de alto costo', ejemplo: 'Cuenta de Alto Costo (CAC)', color: '#7a5230' },
  { id: 'industria', label: 'Industria farmacéutica', ejemplo: 'Laboratorios, distribuidores, droguerías', color: '#c2185b' },
  { id: 'gremios', label: 'Gremios y asociaciones sectoriales', ejemplo: 'ANDI Cámara Farmacéutica, ASINFAR, ACEMI', color: '#8d6e00' },
  { id: 'academia', label: 'Academia y sociedades científicas', ejemplo: 'Universidades, sociedades médicas', color: '#3f51b5' },
  { id: 'pacientes', label: 'Pacientes y veedurías ciudadanas', ejemplo: 'Asociaciones de pacientes', color: '#00897b' },
  { id: 'profesionales', label: 'Profesionales de la salud', ejemplo: 'Colegios médicos, químicos farmacéuticos', color: '#5d4037' },
  { id: 'legislativo', label: 'Poder legislativo', ejemplo: 'Congreso de la República', color: '#455a64' },
  { id: 'otros', label: 'Otros actores', ejemplo: 'Medios, cooperación internacional (OPS/OMS)', color: '#616161' },
];

function getCategoria(id) {
  return CATEGORIAS.find((c) => c.id === id) || CATEGORIAS[CATEGORIAS.length - 1];
}

/**
 * Dataset de ejemplo: posicionamiento ilustrativo, con fines académicos.
 * La influencia e interés reales varían según el producto, la terapia
 * y el contexto regulatorio/comercial específico — deben ajustarse
 * caso a caso, no tomarse como referencia definitiva.
 */
const DATASET_EJEMPLO = [
  { nombre: 'Ministerio de Salud y Protección Social', categoria: 'gobierno', influencia: 10, interes: 8, tamano: 8, notas: 'Ente rector del sistema; define política farmacéutica y de precios.' },
  { nombre: 'Congreso de la República', categoria: 'legislativo', influencia: 7, interes: 4, tamano: 5, notas: 'Aprueba reformas estructurales al sistema de salud.' },
  { nombre: 'INVIMA', categoria: 'regulacion', influencia: 9, interes: 7, tamano: 7, notas: 'Registro sanitario, farmacovigilancia y vigilancia de mercado.' },
  { nombre: 'ADRES', categoria: 'aseguramiento', influencia: 8, interes: 6, tamano: 6, notas: 'Administra los recursos del sistema (giro directo, recobros).' },
  { nombre: 'Superintendencia Nacional de Salud', categoria: 'control', influencia: 8, interes: 6, tamano: 6, notas: 'Inspección, vigilancia y control de EPS e IPS.' },
  { nombre: 'IETS', categoria: 'evaluacion', influencia: 7, interes: 7, tamano: 6, notas: 'Evaluaciones de tecnología sanitaria que soportan decisiones de cobertura.' },
  { nombre: 'Cuenta de Alto Costo', categoria: 'alto_costo', influencia: 6, interes: 6, tamano: 5, notas: 'Gestión del riesgo en enfermedades de alto costo.' },
  { nombre: 'EPS régimen contributivo', categoria: 'aseguramiento', influencia: 8, interes: 9, tamano: 7, notas: 'Gestionan acceso y compra de medicamentos para afiliados.' },
  { nombre: 'EPS régimen subsidiado', categoria: 'aseguramiento', influencia: 7, interes: 8, tamano: 6, notas: 'Población vulnerable; alta sensibilidad al costo.' },
  { nombre: 'IPS / hospitales de alta complejidad', categoria: 'prestacion', influencia: 6, interes: 8, tamano: 6, notas: 'Prescriben y administran tratamientos de alto costo.' },
  { nombre: 'IPS / clínicas y consultorios', categoria: 'prestacion', influencia: 5, interes: 7, tamano: 5, notas: 'Puerta de entrada al sistema; relación directa con el paciente.' },
  { nombre: 'Droguerías y cadenas farmacéuticas', categoria: 'prestacion', influencia: 3, interes: 6, tamano: 4, notas: 'Canal de dispensación minorista.' },
  { nombre: 'Laboratorios farmacéuticos innovadores', categoria: 'industria', influencia: 7, interes: 10, tamano: 8, notas: 'Investigación, registro y comercialización de moléculas nuevas.' },
  { nombre: 'Laboratorios de genéricos', categoria: 'industria', influencia: 5, interes: 9, tamano: 6, notas: 'Compiten en precio una vez vence la exclusividad.' },
  { nombre: 'Distribuidores y mayoristas', categoria: 'industria', influencia: 4, interes: 7, tamano: 4, notas: 'Logística y disponibilidad en el territorio nacional.' },
  { nombre: 'ANDI - Cámara de la Industria Farmacéutica', categoria: 'gremios', influencia: 6, interes: 9, tamano: 6, notas: 'Representa intereses de la industria innovadora ante el Gobierno.' },
  { nombre: 'ASINFAR', categoria: 'gremios', influencia: 5, interes: 9, tamano: 5, notas: 'Gremio de la industria farmacéutica nacional/genéricos.' },
  { nombre: 'ACEMI', categoria: 'gremios', influencia: 6, interes: 7, tamano: 5, notas: 'Asociación de EPS del régimen contributivo.' },
  { nombre: 'Asociaciones de pacientes', categoria: 'pacientes', influencia: 4, interes: 9, tamano: 5, notas: 'Inciden en tutelas, veeduría y agenda pública de acceso.' },
  { nombre: 'Academia / universidades', categoria: 'academia', influencia: 3, interes: 5, tamano: 4, notas: 'Formación de talento y evidencia científica.' },
  { nombre: 'Colegios y asociaciones médicas', categoria: 'profesionales', influencia: 5, interes: 6, tamano: 5, notas: 'Guías clínicas y práctica de prescripción.' },
  { nombre: 'Procuraduría / Contraloría', categoria: 'control', influencia: 6, interes: 4, tamano: 4, notas: 'Control disciplinario y fiscal sobre el uso de recursos públicos.' },
  { nombre: 'Medios de comunicación', categoria: 'otros', influencia: 4, interes: 3, tamano: 3, notas: 'Amplifican casos de acceso/desabastecimiento.' },
  { nombre: 'OPS/OMS - cooperación internacional', categoria: 'otros', influencia: 3, interes: 5, tamano: 3, notas: 'Lineamientos técnicos y cooperación en salud pública.' },
];
