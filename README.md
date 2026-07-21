# Mapa de Stakeholders — Sistema de Salud Colombiano

Herramienta web pública, gratuita y de código abierto para **mapear y diagramar
actores (stakeholders)** relevantes para la industria farmacéutica dentro del
sistema de salud colombiano: aseguramiento, prestación, gobierno/regulación,
gremios, academia, pacientes y más.

Pensada como **guía académica y práctica** — sirve tanto para clases y trabajos
de grado como para ejercicios reales de acceso al mercado, asuntos regulatorios
o asuntos públicos ("public affairs") en el sector salud.

🔗 **Demo en vivo:** [fadavilar.github.io/MapaDeStakeholders](https://fadavilar.github.io/MapaDeStakeholders/)

## ¿Por qué usar esta herramienta?

Mapear stakeholders es un paso estándar en acceso al mercado, asuntos
regulatorios y asuntos públicos en salud: ayuda a anticipar quién puede
facilitar o frenar un proyecto, producto o política, y a priorizar dónde
invertir el esfuerzo de relacionamiento. Esta app traduce ese ejercicio al
vocabulario y a los actores propios del sistema de salud colombiano, evitando
construir la matriz desde cero en una hoja de cálculo.

## ¿Para quién es?

- Estudiantes y docentes de maestrías o cursos en acceso al mercado, asuntos
  regulatorios, gestión en salud o administración farmacéutica.
- Profesionales de la industria farmacéutica (acceso, asuntos regulatorios,
  asuntos públicos, market access) que necesiten construir o presentar un
  mapa de actores para un producto, terapia o proyecto específico.

## ¿Qué hace?

- Permite **diligenciar actores** mediante un formulario: nombre, categoría,
  influencia (0–10), interés (0–10), un tercer atributo opcional de tamaño
  ("impacto") y notas libres.
- Clasifica a cada actor en una de **14 categorías** propias del sistema de
  salud colombiano (Ministerio de Salud, INVIMA, EPS, ADRES, IPS, IETS,
  Cuenta de Alto Costo, Supersalud, industria farmacéutica, gremios, academia,
  pacientes, profesionales de la salud, entre otras).
- Grafica automáticamente un **bubble chart de cuatro cuadrantes**
  (matriz de poder-interés / modelo de Mendelow):
  - **Jugadores clave** — alta influencia, alto interés.
  - **Mantener satisfechos** — alta influencia, bajo interés.
  - **Mantener informados** — baja influencia, alto interés.
  - **Monitorear** — baja influencia, bajo interés.
- Incluye un **conjunto de datos de ejemplo** con ~24 actores típicos del
  sector, listo para cargar con un clic y usar como punto de partida.
- **Exporta e importa** el mapa en JSON, exporta a CSV y exporta el gráfico
  como imagen PNG (útil para informes y presentaciones).
- Los datos se guardan **solo en el navegador del usuario** (`localStorage`).
  No hay backend, no hay base de datos, no se envía información a ningún
  servidor — por lo tanto no hay necesidad de inicio de sesión ni riesgos de
  privacidad asociados al uso de la herramienta.

## Cómo usarlo

1. Abre la aplicación (ver demo en vivo arriba, o `index.html` en local).
2. Opcional: despliega **"Guía metodológica"** para repasar el marco
   conceptual antes de diligenciar.
3. Agrega actores con el formulario de la izquierda, o pulsa
   **"Cargar ejemplo"** para partir de un conjunto ya construido.
4. Observa cómo cada actor se ubica automáticamente en el mapa de cuadrantes
   a la derecha, coloreado por categoría.
5. Ajusta influencia/interés según tu análisis específico — **el
   posicionamiento correcto depende del producto, la terapia o el proyecto
   que estés evaluando**, no es un valor fijo por actor.
6. Exporta tu mapa (JSON para retomarlo después, CSV para análisis en Excel,
   PNG para incluirlo en un informe o presentación).

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
├── js/data.js            # Categorías de actores + dataset de ejemplo
├── js/storage.js         # localStorage + exportar/importar JSON/CSV
├── js/chart.js           # Bubble chart de 4 cuadrantes (Chart.js)
├── js/app.js              # Formulario CRUD, tabla, eventos
└── .github/workflows/pages.yml  # Publicación automática en GitHub Pages
```

## Marco metodológico

La herramienta se basa en la **matriz de poder-interés** (modelo de
Mendelow), ampliamente usada en gestión de stakeholders, adaptada al
vocabulario y a los actores propios del sistema de salud colombiano (Ley 100
de 1993 y su desarrollo posterior: Ministerio de Salud y Protección Social,
INVIMA, ADRES, Superintendencia Nacional de Salud, EPS, IPS, IETS, Cuenta de
Alto Costo, gremios sectoriales, entre otros).

El objetivo académico es que estudiantes, profesionales de acceso al mercado,
asuntos regulatorios y asuntos públicos puedan **practicar y aplicar** el
ejercicio de mapeo de actores con un vocabulario y ejemplos realistas del
contexto colombiano, sin depender de licencias de software de pago.

## Referencias y fuentes

**Marco metodológico**
- [Mendelow's Matrix: Stakeholder Mapping Explained — Toolshero](https://www.toolshero.com/strategy/mendelow-matrix/)
- [Ley 100 de 1993 — Gestor Normativo, Función Pública](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=5248)

**Entidades de gobierno y regulación**
- [Ministerio de Salud y Protección Social](https://www.minsalud.gov.co)
- [INVIMA](https://www.invima.gov.co)
- [ADRES](https://www.adres.gov.co)
- [Superintendencia Nacional de Salud](https://www.supersalud.gov.co)
- [IETS](https://www.iets.org.co)
- [Cuenta de Alto Costo](https://cuentadealtocosto.org)

**Gremios sectoriales**
- [ANDI — Cámara de la Industria Farmacéutica](https://www.andi.com.co/Home/Camara/18-industria-farmaceutica)
- [ASINFAR](https://www.asinfar.org/)
- [ACEMI](https://acemi.org.co/)

## Aviso

El dataset de ejemplo incluido es **ilustrativo y de uso académico**: las
posiciones de influencia/interés asignadas son subjetivas y genéricas, no
constituyen un análisis validado para ningún producto, terapia o compañía en
particular. Cada usuario debe ajustar los valores a su propio contexto y
objetivo de análisis.

## Licencia

Distribuido bajo licencia [MIT](LICENSE).
