# Mapa de Stakeholders — Sistema de Salud Latinoamericano

Herramienta web pública y gratuita para **mapear y diagramar actores
(stakeholders)** relevantes para la política pública en salud y la industria
farmacéutica en Latinoamérica: gobierno/regulación, aseguramiento,
prestación, gremios, academia, pacientes y más.

Pensada como **guía académica y práctica** — sirve tanto para clases y
trabajos de grado en política pública/salud pública, como para ejercicios
reales de análisis de política pública en salud, acceso al mercado, asuntos
regulatorios o asuntos públicos ("public affairs").

🔗 **Demo en vivo:** [fadavilar.github.io/MapaDeStakeholders](https://fadavilar.github.io/MapaDeStakeholders/)

## ¿Por qué usar esta herramienta?

Mapear stakeholders es un paso estándar en el análisis de política pública
en salud, acceso al mercado, asuntos regulatorios y asuntos públicos: ayuda
a anticipar quién puede facilitar o frenar una reforma, un proyecto o un
producto, y a priorizar dónde invertir el esfuerzo de relacionamiento. Esta
app traduce ese ejercicio al vocabulario y a los actores propios de los
sistemas de salud latinoamericanos, evitando construir la matriz desde cero
en una hoja de cálculo.

## ¿Para quién es?

- Estudiantes y docentes de maestrías o cursos en política pública, salud
  pública, acceso al mercado, asuntos regulatorios o administración
  farmacéutica.
- Analistas de política pública en salud a nivel regional o de país.
- Profesionales de la industria farmacéutica (acceso, asuntos regulatorios,
  asuntos públicos, market access) que necesiten construir o presentar un
  mapa de actores para una reforma, terapia o proyecto específico.

## ¿Qué hace?

- Permite **diligenciar actores** mediante un formulario: nombre, categoría,
  influencia (0–10), interés (0–10), un tercer atributo opcional de tamaño
  ("impacto") y notas libres. Cada campo incluye un tooltip explicativo.
- Clasifica a cada actor en una de **14 categorías** propias de los sistemas
  de salud latinoamericanos (gobierno/ente rector, regulación sanitaria,
  aseguramiento, prestación, entes de control, evaluación de tecnologías,
  gestión de riesgo/alto costo, industria farmacéutica, gremios, academia,
  pacientes, profesionales de la salud, poder legislativo, otros).
- Grafica automáticamente un **bubble chart de cuatro cuadrantes**
  (matriz de poder-interés / modelo de Mendelow):
  - **Jugadores clave** — alta influencia, alto interés.
  - **Mantener satisfechos** — alta influencia, bajo interés.
  - **Mantener informados** — baja influencia, alto interés.
  - **Monitorear** — baja influencia, bajo interés.
- Incluye **conjuntos de datos de ejemplo** para siete países/regiones
  (Colombia, Argentina, México, Perú, Ecuador, Brasil y Centroamérica y
  República Dominicana), listos para cargar con un clic desde un selector.
- **Carga masiva vía Excel**: descarga [`plantilla-mapa-stakeholders.xlsx`](plantilla-mapa-stakeholders.xlsx),
  un archivo **estático y prediligenciado** (no generado por JavaScript) con
  instrucciones y categorías válidas, diligénciala y súbela con el botón
  "Cargar desde Excel" — no requiere conocimientos técnicos. Al ser estático,
  la descarga nunca depende de una librería externa ni de conexión a
  internet; solo "Cargar desde Excel" y "Exportar Excel" usan
  [SheetJS](https://sheetjs.com/) para leer/escribir el archivo.
- **Exporta** el mapa a Excel (`.xlsx`), a un reporte HTML autocontenido
  (fácil de abrir y leer en cualquier dispositivo, sin necesidad de Excel) y
  el gráfico como imagen PNG.
- Los datos se guardan **solo en el navegador del usuario** (`localStorage`).
  No hay backend, no hay base de datos, no se envía información a ningún
  servidor — por lo tanto no hay necesidad de inicio de sesión ni riesgos de
  privacidad asociados al uso de la herramienta.

## Cómo usarlo

1. Abre la aplicación (ver demo en vivo arriba, o `index.html` en local).
2. Opcional: despliega **"Guía metodológica"** para repasar el marco
   conceptual antes de diligenciar.
3. Elige un país/región en el selector (carga automáticamente al
   seleccionar) para partir de un conjunto ya construido, o descarga la
   **plantilla Excel**, diligénciala y cárgala con **"Cargar desde Excel"**.
4. Observa cómo cada actor se ubica automáticamente en el mapa de cuadrantes
   a la derecha, coloreado por categoría.
5. Ajusta influencia/interés según tu análisis específico — **el
   posicionamiento correcto depende de la reforma, el producto o el proyecto
   que estés evaluando**, no es un valor fijo por actor.
6. Exporta tu mapa a Excel para seguir trabajándolo, o a HTML/PNG para
   incluirlo en un informe o presentación.

## Ejecutar en local

No requiere instalación ni proceso de build: es HTML/CSS/JS puro.

```bash
git clone https://github.com/fadavilar/MapaDeStakeholders.git
cd MapaDeStakeholders
# Abre index.html directamente en el navegador, o sirve la carpeta:
python -m http.server 8000
# y visita http://localhost:8000
```

## Despliegue en GitHub Pages

Este repositorio incluye un workflow de GitHub Actions
(`.github/workflows/pages.yml`) que publica automáticamente el sitio estático
en GitHub Pages con cada push a `main`.

GitHub Pages ya está activo para este repositorio (Source: GitHub Actions).
Cada push a `main` vuelve a publicar el sitio automáticamente en
`https://fadavilar.github.io/MapaDeStakeholders/`.

## Estructura del proyecto

```
├── index.html          # Estructura de la página
├── css/styles.css       # Estilos (tema claro/oscuro, responsivo)
├── js/data.js            # Categorías + datasets de ejemplo por país
├── js/storage.js         # localStorage + carga/exportación XLSX y HTML
├── js/chart.js           # Bubble chart de 4 cuadrantes (Chart.js)
├── js/app.js              # Formulario CRUD, tabla, eventos
├── plantilla-mapa-stakeholders.xlsx  # Plantilla Excel estática y prediligenciada
└── .github/workflows/pages.yml  # Publicación automática en GitHub Pages
```

Librerías usadas vía CDN: [Chart.js](https://www.chartjs.org/) para el
gráfico y [SheetJS (xlsx)](https://sheetjs.com/) para leer/escribir archivos
Excel — ambas cargadas directamente en `index.html`, sin proceso de build.

## Marco metodológico

La herramienta se basa en la **matriz de poder-interés** (modelo de
Mendelow) y en la literatura de análisis de actores en política de salud
(Varvasovszky & Brugha, Schmeer/PAHO, Reich/Harvard, OMS — ver
[Referencias](#referencias-y-fuentes)), adaptada al vocabulario y a los
actores propios de los sistemas de salud latinoamericanos.

El objetivo académico es que estudiantes, analistas de política pública y
profesionales de acceso al mercado, asuntos regulatorios y asuntos públicos
puedan **practicar y aplicar** el ejercicio de mapeo de actores con un
vocabulario y ejemplos realistas de distintos países de la región, sin
depender de licencias de software de pago.

## Referencias y fuentes

**Fundamentos teóricos del mapeo de stakeholders en política de salud**
- [Mendelow's Matrix: Stakeholder Mapping Explained — Toolshero](https://www.toolshero.com/strategy/mendelow-matrix/)
- [Brugha R, Varvasovszky Z (2000). "Stakeholder analysis: a review." *Health Policy and Planning*](https://academic.oup.com/heapol/article/15/3/239/573296)
- [Varvasovszky Z, Brugha R (2000). "A stakeholder analysis." *Health Policy and Planning*](https://academic.oup.com/heapol/article/15/3/338/573312)
- [Schmeer K. "Stakeholder Analysis Guidelines" — Iniciativa Regional de Reforma del Sector Salud en América Latina y el Caribe (LAC-HSR)](https://cnxus.org/wp-content/uploads/2022/04/Stakeholders_analysis_guidelines.pdf)
- [Reich MR et al. "Health Reform Manual: Eight Practical Steps" — Harvard T.H. Chan School of Public Health](https://hsph.harvard.edu/wp-content/uploads/2025/02/Health-Reform-Manual_FINAL_for-website-002.pdf)
- ["Engaging Stakeholders..." — Evidence Synthesis for Health Policy and Systems: A Methods Guide, OMS (2018)](https://www.ncbi.nlm.nih.gov/books/NBK569579/)
- [Ley 100 de 1993 — Gestor Normativo, Función Pública (Colombia)](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=5248)

**Entidades de gobierno y regulación (Colombia, ver dataset de ejemplo)**
- [Ministerio de Salud y Protección Social](https://www.minsalud.gov.co)
- [INVIMA](https://www.invima.gov.co)
- [ADRES](https://www.adres.gov.co)
- [Superintendencia Nacional de Salud](https://www.supersalud.gov.co)
- [IETS](https://www.iets.org.co)
- [Cuenta de Alto Costo](https://cuentadealtocosto.org)

**Gremios sectoriales (Colombia, ver dataset de ejemplo)**
- [ANDI — Cámara de la Industria Farmacéutica](https://www.andi.com.co/Home/Camara/18-industria-farmaceutica)
- [ASINFAR](https://www.asinfar.org/)
- [ACEMI](https://acemi.org.co/)

*Nota: se revisaron los documentos de la carpeta de trabajo inicial del
proyecto (PDFs sobre polifarmacia y adherencia terapéutica); corresponden a
un estudio distinto y no contienen material sobre teoría de mapeo de
stakeholders, por lo que las referencias teóricas anteriores se tomaron de
la literatura académica especializada en la materia.*

## Aviso

Los datasets de ejemplo incluidos son **ilustrativos y de uso académico**:
las posiciones de influencia/interés asignadas son subjetivas y genéricas,
no constituyen un análisis validado para ningún producto, terapia, reforma o
compañía en particular. Cada usuario debe ajustar los valores a su propio
contexto y objetivo de análisis.

## Licencia

Distribuido bajo licencia [Creative Commons Reconocimiento-NoComercial 4.0
Internacional (CC BY-NC 4.0)](LICENSE) — uso y adaptación libres para fines
no comerciales, dando crédito al autor original.
