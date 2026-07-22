/**
 * Categorías de actores relevantes para el análisis de política pública
 * en salud y la industria farmacéutica en Latinoamérica.
 */
const CATEGORIAS = [
  { id: 'gobierno', label: 'Gobierno / Ente rector', ejemplo: 'Ministerios de Salud, entes rectores nacionales', color: '#1f4e8c' },
  { id: 'regulacion', label: 'Regulación sanitaria', ejemplo: 'Agencias de registro y vigilancia de medicamentos', color: '#6a4fa3' },
  { id: 'aseguramiento', label: 'Aseguramiento', ejemplo: 'Seguros sociales, EPS/obras sociales, seguros privados', color: '#1a8f5e' },
  { id: 'prestacion', label: 'Prestación de servicios', ejemplo: 'Hospitales, clínicas, IPS públicas y privadas', color: '#d17a1f' },
  { id: 'control', label: 'Entes de control', ejemplo: 'Superintendencias, contralorías, entes fiscalizadores', color: '#b3261e' },
  { id: 'evaluacion', label: 'Evaluación de tecnologías', ejemplo: 'Agencias de evaluación de tecnología sanitaria (HTA)', color: '#0f9aa8' },
  { id: 'alto_costo', label: 'Gestión de riesgo / alto costo', ejemplo: 'Fondos y cuentas de enfermedades de alto costo', color: '#7a5230' },
  { id: 'industria', label: 'Industria farmacéutica', ejemplo: 'Laboratorios, distribuidores, droguerías', color: '#c2185b' },
  { id: 'gremios', label: 'Gremios y asociaciones sectoriales', ejemplo: 'Cámaras farmacéuticas, asociaciones de aseguradores', color: '#8d6e00' },
  { id: 'academia', label: 'Academia y sociedades científicas', ejemplo: 'Universidades, sociedades médicas', color: '#3f51b5' },
  { id: 'pacientes', label: 'Pacientes y veedurías ciudadanas', ejemplo: 'Asociaciones de pacientes', color: '#00897b' },
  { id: 'profesionales', label: 'Profesionales de la salud', ejemplo: 'Colegios médicos, químicos farmacéuticos', color: '#5d4037' },
  { id: 'legislativo', label: 'Poder legislativo', ejemplo: 'Congresos, asambleas y parlamentos nacionales', color: '#455a64' },
  { id: 'otros', label: 'Otros actores', ejemplo: 'Medios, cooperación internacional (OPS/OMS)', color: '#616161' },
];

function getCategoria(id) {
  return CATEGORIAS.find((c) => c.id === id) || CATEGORIAS[CATEGORIAS.length - 1];
}

/**
 * Países/regiones disponibles para los conjuntos de datos de ejemplo.
 */
const PAISES = [
  { id: 'colombia', label: '🇨🇴 Colombia' },
  { id: 'argentina', label: '🇦🇷 Argentina' },
  { id: 'mexico', label: '🇲🇽 México' },
  { id: 'peru', label: '🇵🇪 Perú' },
  { id: 'ecuador', label: '🇪🇨 Ecuador' },
  { id: 'brasil', label: '🇧🇷 Brasil' },
  { id: 'centroamerica', label: '🌎 Centroamérica y R. Dominicana' },
];

/**
 * Referencias oficiales por país/región (entes rectores, autoridades de
 * registro sanitario y gremios de la industria farmacéutica citados en el
 * dataset de ejemplo de cada país), mostradas dinámicamente según el país
 * seleccionado en el selector de ejemplo. Todos los enlaces fueron
 * verificados como activos al momento de publicar esta versión.
 */
const REFERENCIAS_POR_PAIS = {
  colombia: [
    { label: 'Ministerio de Salud y Protección Social', url: 'https://www.minsalud.gov.co' },
    { label: 'INVIMA', url: 'https://www.invima.gov.co' },
    { label: 'ADRES', url: 'https://www.adres.gov.co' },
    { label: 'Superintendencia Nacional de Salud', url: 'https://www.supersalud.gov.co' },
    { label: 'IETS', url: 'https://www.iets.org.co' },
    { label: 'Cuenta de Alto Costo', url: 'https://cuentadealtocosto.org' },
    { label: 'ANDI — Cámara de la Industria Farmacéutica', url: 'https://www.andi.com.co/Home/Camara/18-industria-farmaceutica' },
    { label: 'ASINFAR', url: 'https://www.asinfar.org/' },
    { label: 'ACEMI', url: 'https://acemi.org.co/' },
  ],
  argentina: [
    { label: 'Ministerio de Salud de la Nación', url: 'https://www.argentina.gob.ar/salud' },
    { label: 'ANMAT', url: 'https://www.argentina.gob.ar/anmat' },
    { label: 'CAEMe', url: 'https://www.caeme.org.ar' },
    { label: 'CILFA', url: 'https://www.cilfa.org.ar' },
  ],
  mexico: [
    { label: 'Secretaría de Salud', url: 'https://www.gob.mx/salud' },
    { label: 'COFEPRIS', url: 'https://www.gob.mx/cofepris' },
    { label: 'CANIFARMA', url: 'https://www.canifarma.org.mx' },
    { label: 'AMIIF', url: 'https://amiif.org' },
  ],
  peru: [
    { label: 'MINSA', url: 'https://www.gob.pe/minsa' },
    { label: 'DIGEMID', url: 'https://www.digemid.minsa.gob.pe/' },
    { label: 'ALAFARPE', url: 'https://www.alafarpe.org.pe' },
    { label: 'ADIFAN', url: 'https://www.adifan.org.pe' },
  ],
  ecuador: [
    { label: 'Ministerio de Salud Pública', url: 'https://www.salud.gob.ec/' },
    { label: 'ARCSA', url: 'https://www.controlsanitario.gob.ec/' },
    { label: 'ALFE (Asociación de Laboratorios Farmacéuticos del Ecuador)', url: 'https://alfe-ecuador.org/' },
  ],
  brasil: [
    { label: 'Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br' },
    { label: 'ANVISA', url: 'https://www.gov.br/anvisa/pt-br' },
    { label: 'Interfarma', url: 'https://www.interfarma.org.br/' },
  ],
  centroamerica: [
    { label: 'Ministerio de Salud de Costa Rica (ejemplo nacional)', url: 'https://www.ministeriodesalud.go.cr' },
    { label: 'OPS/OMS — Oficina Regional para las Américas', url: 'https://www.paho.org/es' },
    { label: 'FEDEFARMA', url: 'https://www.fedefarma.com' },
  ],
};

/**
 * Datasets de ejemplo por país/región: posicionamiento ilustrativo, con
 * fines académicos y de práctica en análisis de política pública en salud.
 * La influencia e interés reales varían según el producto, la terapia,
 * la coyuntura política y el contexto regulatorio/comercial específico —
 * deben ajustarse caso a caso, no tomarse como referencia definitiva.
 */
const DATASETS_EJEMPLO = {
  colombia: [
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
  ],

  argentina: [
    { nombre: 'Ministerio de Salud de la Nación', categoria: 'gobierno', influencia: 10, interes: 8, tamano: 8, notas: 'Ente rector; coordina con las 24 jurisdicciones el sistema federal de salud.' },
    { nombre: 'Consejo Federal de Salud (COFESA)', categoria: 'gobierno', influencia: 6, interes: 5, tamano: 4, notas: 'Coordinación entre Nación y provincias en un sistema muy descentralizado.' },
    { nombre: 'ANMAT', categoria: 'regulacion', influencia: 9, interes: 7, tamano: 7, notas: 'Registro sanitario y vigilancia de medicamentos y tecnologías.' },
    { nombre: 'Superintendencia de Servicios de Salud', categoria: 'control', influencia: 7, interes: 6, tamano: 5, notas: 'Controla obras sociales y empresas de medicina prepaga.' },
    { nombre: 'PAMI (INSSJP)', categoria: 'aseguramiento', influencia: 8, interes: 9, tamano: 7, notas: 'Principal asegurador de personas jubiladas y pensionadas.' },
    { nombre: 'Obras sociales sindicales', categoria: 'aseguramiento', influencia: 7, interes: 8, tamano: 6, notas: 'Aseguramiento ligado al empleo formal (modelo tripartito).' },
    { nombre: 'Empresas de medicina prepaga', categoria: 'aseguramiento', influencia: 6, interes: 8, tamano: 5, notas: 'Seguro voluntario privado, regulado por la Superintendencia.' },
    { nombre: 'CONETEC', categoria: 'evaluacion', influencia: 6, interes: 7, tamano: 5, notas: 'Comisión Nacional de Evaluación de Tecnologías Sanitarias y Excelencia Clínica.' },
    { nombre: 'Hospitales públicos provinciales', categoria: 'prestacion', influencia: 5, interes: 8, tamano: 6, notas: 'Prestación gratuita para población sin cobertura formal.' },
    { nombre: 'Clínicas y sanatorios privados', categoria: 'prestacion', influencia: 5, interes: 7, tamano: 5, notas: 'Prestadores contratados por obras sociales y prepagas.' },
    { nombre: 'Laboratorios farmacéuticos innovadores', categoria: 'industria', influencia: 7, interes: 10, tamano: 7, notas: 'Investigación y registro de nuevas moléculas.' },
    { nombre: 'Laboratorios nacionales de genéricos', categoria: 'industria', influencia: 5, interes: 9, tamano: 6, notas: 'Fuerte industria local de genéricos y biosimilares.' },
    { nombre: 'CAEMe (Cámara de Especialidades Medicinales)', categoria: 'gremios', influencia: 6, interes: 9, tamano: 5, notas: 'Gremio de laboratorios multinacionales de investigación.' },
    { nombre: 'CILFA (Cámara Industrial de Laboratorios Farmacéuticos Argentinos)', categoria: 'gremios', influencia: 5, interes: 9, tamano: 5, notas: 'Gremio de laboratorios de capital nacional.' },
    { nombre: 'COFA (Confederación Farmacéutica Argentina)', categoria: 'profesionales', influencia: 5, interes: 6, tamano: 4, notas: 'Representa a las farmacias y farmacéuticos del país.' },
    { nombre: 'Congreso de la Nación', categoria: 'legislativo', influencia: 7, interes: 4, tamano: 5, notas: 'Sanciona leyes de cobertura (ej. enfermedades poco frecuentes).' },
    { nombre: 'Asociaciones de pacientes', categoria: 'pacientes', influencia: 4, interes: 9, tamano: 5, notas: 'Activas en amparos judiciales por acceso a medicamentos.' },
    { nombre: 'Academia / universidades', categoria: 'academia', influencia: 3, interes: 5, tamano: 4, notas: 'Formación e investigación clínica y farmacoeconómica.' },
  ],

  mexico: [
    { nombre: 'Secretaría de Salud', categoria: 'gobierno', influencia: 10, interes: 8, tamano: 8, notas: 'Ente rector del Sistema Nacional de Salud.' },
    { nombre: 'COFEPRIS', categoria: 'regulacion', influencia: 9, interes: 7, tamano: 7, notas: 'Registro sanitario, permisos y vigilancia de medicamentos.' },
    { nombre: 'IMSS', categoria: 'aseguramiento', influencia: 9, interes: 9, tamano: 8, notas: 'Mayor institución de seguridad social del país (trabajadores formales).' },
    { nombre: 'ISSSTE', categoria: 'aseguramiento', influencia: 7, interes: 8, tamano: 6, notas: 'Seguridad social de trabajadores del Estado.' },
    { nombre: 'IMSS-Bienestar', categoria: 'aseguramiento', influencia: 8, interes: 8, tamano: 6, notas: 'Atiende a población sin seguridad social formal.' },
    { nombre: 'Seguros de gastos médicos privados', categoria: 'aseguramiento', influencia: 5, interes: 7, tamano: 4, notas: 'Aseguramiento voluntario complementario.' },
    { nombre: 'CENETEC', categoria: 'evaluacion', influencia: 6, interes: 7, tamano: 5, notas: 'Centro Nacional de Excelencia Tecnológica en Salud (evaluación de tecnologías, guías de práctica clínica).' },
    { nombre: 'Hospitales públicos (Secretaría de Salud / IMSS)', categoria: 'prestacion', influencia: 5, interes: 8, tamano: 6, notas: 'Red pública de prestación de servicios.' },
    { nombre: 'Hospitales y clínicas privadas', categoria: 'prestacion', influencia: 5, interes: 7, tamano: 5, notas: 'Prestación privada, incluyendo turismo de salud.' },
    { nombre: 'Laboratorios farmacéuticos innovadores', categoria: 'industria', influencia: 7, interes: 10, tamano: 7, notas: 'Investigación, registro y comercialización de nuevas moléculas.' },
    { nombre: 'Laboratorios nacionales de genéricos', categoria: 'industria', influencia: 5, interes: 9, tamano: 6, notas: 'Fuerte mercado de genéricos e intercambiables.' },
    { nombre: 'CANIFARMA', categoria: 'gremios', influencia: 6, interes: 9, tamano: 6, notas: 'Cámara Nacional de la Industria Farmacéutica.' },
    { nombre: 'AMIIF', categoria: 'gremios', influencia: 6, interes: 9, tamano: 5, notas: 'Asociación Mexicana de Industrias de Investigación Farmacéutica.' },
    { nombre: 'Colegios y asociaciones médicas', categoria: 'profesionales', influencia: 5, interes: 6, tamano: 4, notas: 'Guías clínicas y práctica de prescripción.' },
    { nombre: 'Congreso de la Unión', categoria: 'legislativo', influencia: 7, interes: 4, tamano: 5, notas: 'Aprueba presupuesto y reformas al sistema de salud.' },
    { nombre: 'Asociaciones de pacientes', categoria: 'pacientes', influencia: 4, interes: 9, tamano: 5, notas: 'Incidencia en desabasto y acceso a tratamientos de alto costo.' },
    { nombre: 'Academia / universidades (UNAM y otras)', categoria: 'academia', influencia: 3, interes: 5, tamano: 4, notas: 'Formación de talento e investigación clínica.' },
  ],

  peru: [
    { nombre: 'MINSA (Ministerio de Salud)', categoria: 'gobierno', influencia: 10, interes: 8, tamano: 8, notas: 'Ente rector del sistema de salud peruano.' },
    { nombre: 'DIGEMID', categoria: 'regulacion', influencia: 8, interes: 7, tamano: 6, notas: 'Dirección General de Medicamentos, Insumos y Drogas (registro sanitario).' },
    { nombre: 'SUSALUD', categoria: 'control', influencia: 7, interes: 6, tamano: 5, notas: 'Superintendencia Nacional de Salud; protección de derechos en salud.' },
    { nombre: 'EsSalud', categoria: 'aseguramiento', influencia: 9, interes: 9, tamano: 8, notas: 'Seguro social de salud para trabajadores formales y familias.' },
    { nombre: 'SIS (Seguro Integral de Salud)', categoria: 'aseguramiento', influencia: 7, interes: 8, tamano: 6, notas: 'Aseguramiento público para población de menores recursos.' },
    { nombre: 'IAFAS / EPS privadas', categoria: 'aseguramiento', influencia: 5, interes: 7, tamano: 4, notas: 'Instituciones administradoras de fondos de aseguramiento privadas.' },
    { nombre: 'IETSI - EsSalud', categoria: 'evaluacion', influencia: 6, interes: 7, tamano: 5, notas: 'Instituto de Evaluación de Tecnologías en Salud e Investigación.' },
    { nombre: 'Hospitales públicos (MINSA / EsSalud)', categoria: 'prestacion', influencia: 5, interes: 8, tamano: 6, notas: 'Red pública de prestación de servicios.' },
    { nombre: 'Clínicas privadas', categoria: 'prestacion', influencia: 5, interes: 7, tamano: 5, notas: 'Prestación privada en principales ciudades.' },
    { nombre: 'Laboratorios farmacéuticos innovadores', categoria: 'industria', influencia: 7, interes: 10, tamano: 7, notas: 'Investigación, registro y comercialización de nuevas moléculas.' },
    { nombre: 'Laboratorios nacionales de genéricos', categoria: 'industria', influencia: 5, interes: 9, tamano: 6, notas: 'Industria farmacéutica local.' },
    { nombre: 'ALAFARPE', categoria: 'gremios', influencia: 6, interes: 9, tamano: 5, notas: 'Asociación Nacional de Laboratorios Farmacéuticos (multinacionales).' },
    { nombre: 'ADIFAN', categoria: 'gremios', influencia: 5, interes: 9, tamano: 5, notas: 'Asociación de Industrias Farmacéuticas Nacionales.' },
    { nombre: 'Colegio Médico del Perú', categoria: 'profesionales', influencia: 5, interes: 6, tamano: 4, notas: 'Guías clínicas y práctica de prescripción.' },
    { nombre: 'Congreso de la República', categoria: 'legislativo', influencia: 7, interes: 4, tamano: 5, notas: 'Presupuesto y reformas legislativas en salud.' },
    { nombre: 'Asociaciones de pacientes', categoria: 'pacientes', influencia: 4, interes: 9, tamano: 5, notas: 'Incidencia en acceso a tratamientos de alto costo.' },
    { nombre: 'Academia / universidades', categoria: 'academia', influencia: 3, interes: 5, tamano: 4, notas: 'Formación e investigación clínica.' },
  ],

  ecuador: [
    { nombre: 'Ministerio de Salud Pública (MSP)', categoria: 'gobierno', influencia: 10, interes: 8, tamano: 8, notas: 'Ente rector del Sistema Nacional de Salud.' },
    { nombre: 'ARCSA', categoria: 'regulacion', influencia: 9, interes: 7, tamano: 7, notas: 'Agencia Nacional de Regulación, Control y Vigilancia Sanitaria.' },
    { nombre: 'IESS (Instituto Ecuatoriano de Seguridad Social)', categoria: 'aseguramiento', influencia: 9, interes: 9, tamano: 8, notas: 'Principal asegurador social del país.' },
    { nombre: 'ISSFA / ISSPOL', categoria: 'aseguramiento', influencia: 5, interes: 6, tamano: 4, notas: 'Seguridad social de fuerzas armadas y policía.' },
    { nombre: 'Seguros privados de salud', categoria: 'aseguramiento', influencia: 4, interes: 6, tamano: 3, notas: 'Aseguramiento voluntario complementario.' },
    { nombre: 'Hospitales públicos (MSP / IESS)', categoria: 'prestacion', influencia: 5, interes: 8, tamano: 6, notas: 'Red pública de prestación de servicios.' },
    { nombre: 'Clínicas y hospitales privados', categoria: 'prestacion', influencia: 5, interes: 7, tamano: 5, notas: 'Prestación privada en principales ciudades.' },
    { nombre: 'Laboratorios farmacéuticos innovadores', categoria: 'industria', influencia: 6, interes: 10, tamano: 7, notas: 'Investigación, registro y comercialización de nuevas moléculas.' },
    { nombre: 'Laboratorios nacionales de genéricos', categoria: 'industria', influencia: 5, interes: 9, tamano: 6, notas: 'Industria farmacéutica local.' },
    { nombre: 'ALFE (Asociación de Laboratorios Farmacéuticos del Ecuador)', categoria: 'gremios', influencia: 5, interes: 9, tamano: 5, notas: 'Representación gremial de laboratorios nacionales y multinacionales.' },
    { nombre: 'Federación Médica Ecuatoriana', categoria: 'profesionales', influencia: 5, interes: 6, tamano: 4, notas: 'Guías clínicas y práctica de prescripción.' },
    { nombre: 'Asamblea Nacional', categoria: 'legislativo', influencia: 7, interes: 4, tamano: 5, notas: 'Presupuesto y reformas legislativas en salud.' },
    { nombre: 'Asociaciones de pacientes', categoria: 'pacientes', influencia: 4, interes: 9, tamano: 5, notas: 'Incidencia en acceso a tratamientos de alto costo.' },
    { nombre: 'Academia / universidades', categoria: 'academia', influencia: 3, interes: 5, tamano: 4, notas: 'Formación e investigación clínica.' },
  ],

  brasil: [
    { nombre: 'Ministério da Saúde', categoria: 'gobierno', influencia: 10, interes: 8, tamano: 8, notas: 'Ente rector del Sistema Único de Saúde (SUS).' },
    { nombre: 'CONASS (Conselho Nacional de Secretários de Saúde)', categoria: 'gobierno', influencia: 6, interes: 7, tamano: 5, notas: 'Articula a las secretarías estaduales de salud.' },
    { nombre: 'CONASEMS (secretarías municipales de saúde)', categoria: 'gobierno', influencia: 5, interes: 7, tamano: 4, notas: 'Articula a las secretarías municipales de salud.' },
    { nombre: 'ANVISA', categoria: 'regulacion', influencia: 9, interes: 7, tamano: 7, notas: 'Agência Nacional de Vigilância Sanitária; registro y vigilancia de medicamentos.' },
    { nombre: 'ANS (Agência Nacional de Saúde Suplementar)', categoria: 'control', influencia: 8, interes: 7, tamano: 6, notas: 'Regula los planes de salud privados.' },
    { nombre: 'SUS (Sistema Único de Saúde)', categoria: 'prestacion', influencia: 8, interes: 9, tamano: 8, notas: 'Sistema público universal; gestiona la red de prestación de servicios.' },
    { nombre: 'Operadoras de planos de saúde', categoria: 'aseguramiento', influencia: 6, interes: 8, tamano: 6, notas: 'Aseguramiento privado (planes de salud), muy relevante en el mercado.' },
    { nombre: 'CONITEC', categoria: 'evaluacion', influencia: 7, interes: 7, tamano: 6, notas: 'Comissão Nacional de Incorporação de Tecnologias no SUS.' },
    { nombre: 'Hospitais e clínicas privadas', categoria: 'prestacion', influencia: 5, interes: 7, tamano: 5, notas: 'Prestación privada, incluyendo grandes redes hospitalarias.' },
    { nombre: 'Laboratórios farmacêuticos inovadores', categoria: 'industria', influencia: 7, interes: 10, tamano: 7, notas: 'Investigación, registro y comercialización de nuevas moléculas.' },
    { nombre: 'Laboratórios nacionais / genéricos', categoria: 'industria', influencia: 5, interes: 9, tamano: 6, notas: 'Uno de los mercados de genéricos más grandes de la región.' },
    { nombre: 'Interfarma', categoria: 'gremios', influencia: 6, interes: 9, tamano: 6, notas: 'Associação da Indústria Farmacêutica de Pesquisa.' },
    { nombre: 'Laboratórios nacionais / genéricos (associação)', categoria: 'gremios', influencia: 5, interes: 9, tamano: 5, notas: 'Representación gremial de la industria de genéricos y capital nacional.' },
    { nombre: 'Congresso Nacional', categoria: 'legislativo', influencia: 7, interes: 4, tamano: 5, notas: 'Presupuesto y reformas legislativas en salud.' },
    { nombre: 'Associações de pacientes', categoria: 'pacientes', influencia: 4, interes: 9, tamano: 5, notas: 'Incidencia en judicialización de la salud ("judicialização").' },
    { nombre: 'Academia / universidades', categoria: 'academia', influencia: 3, interes: 5, tamano: 4, notas: 'Formación e investigación clínica y en salud pública.' },
  ],

  centroamerica: [
    { nombre: 'Ministerios de Salud (países SICA)', categoria: 'gobierno', influencia: 9, interes: 8, tamano: 7, notas: 'Entes rectores nacionales en cada país de la región.' },
    { nombre: 'COMISCA', categoria: 'gobierno', influencia: 8, interes: 7, tamano: 6, notas: 'Consejo de Ministros de Salud de Centroamérica y República Dominicana (órgano político del SICA).' },
    { nombre: 'SE-COMISCA / SICA', categoria: 'gobierno', influencia: 6, interes: 6, tamano: 4, notas: 'Secretaría Ejecutiva; coordina la agenda regional de salud.' },
    { nombre: 'Agencias reguladoras nacionales de medicamentos', categoria: 'regulacion', influencia: 8, interes: 7, tamano: 6, notas: 'Registro sanitario en cada país (procesos de armonización regional en curso).' },
    { nombre: 'Cajas / institutos de seguridad social (CCSS, IGSS, IHSS, ISSS, INSS, CSS)', categoria: 'aseguramiento', influencia: 8, interes: 9, tamano: 7, notas: 'Principales aseguradores públicos de cada país.' },
    { nombre: 'Seguros privados de salud', categoria: 'aseguramiento', influencia: 4, interes: 6, tamano: 3, notas: 'Aseguramiento voluntario complementario, mercado incipiente.' },
    { nombre: 'Hospitales públicos nacionales', categoria: 'prestacion', influencia: 5, interes: 8, tamano: 6, notas: 'Red pública de prestación en cada país.' },
    { nombre: 'Clínicas y hospitales privados', categoria: 'prestacion', influencia: 5, interes: 7, tamano: 5, notas: 'Incluye polos de turismo de salud (ej. Costa Rica, Panamá).' },
    { nombre: 'Laboratorios farmacéuticos innovadores', categoria: 'industria', influencia: 6, interes: 10, tamano: 6, notas: 'Comercializan a través de distribuidores regionales.' },
    { nombre: 'Laboratorios nacionales de genéricos', categoria: 'industria', influencia: 4, interes: 9, tamano: 5, notas: 'Mercado fragmentado entre los distintos países.' },
    { nombre: 'FEDEFARMA', categoria: 'gremios', influencia: 6, interes: 9, tamano: 5, notas: 'Federación Centroamericana y del Caribe de Laboratorios Farmacéuticos.' },
    { nombre: 'Colegios y asociaciones médicas nacionales', categoria: 'profesionales', influencia: 5, interes: 6, tamano: 4, notas: 'Guías clínicas y práctica de prescripción por país.' },
    { nombre: 'Congresos / Asambleas Legislativas nacionales', categoria: 'legislativo', influencia: 6, interes: 4, tamano: 4, notas: 'Presupuesto y reformas de salud en cada país.' },
    { nombre: 'Asociaciones de pacientes', categoria: 'pacientes', influencia: 4, interes: 9, tamano: 5, notas: 'Incidencia en acceso a medicamentos de alto costo.' },
    { nombre: 'OPS/OMS - oficina regional', categoria: 'otros', influencia: 5, interes: 6, tamano: 4, notas: 'Cooperación técnica y lineamientos de salud pública regional.' },
    { nombre: 'Academia / universidades', categoria: 'academia', influencia: 3, interes: 5, tamano: 3, notas: 'Formación e investigación clínica y en salud pública.' },
  ],
};
