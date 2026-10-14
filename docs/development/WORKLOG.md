# Registro de desarrollo

## 2026-10-07 — `INIT-001`

### Objetivo

Dar inicio al frontend Dev Grid tomando `front-end.md` como derivado de alcance y manteniendo `main.md`, `data.md` y `exercises.md` como fuentes de autoridad.

### Cambios

- Se creó scaffold React + TypeScript + Vite con Tailwind y SCSS.
- Se implementó una primera vertical pública con inicio, navegación por categorías, lectura de unidades, catálogo por nivel, detalle de reto y visualizador algorítmico reversible.
- La interfaz lee el contenido canónico directamente desde Markdown importado como texto.
- Se incorporó editor local de ejercicio con borrador en memoria. Ejecutar y evaluar informan que backend todavía no está conectado.
- Se documentó estado, backlog, changelog y guías de ambas audiencias.

### Decisiones y límites

- Se conservó la especificación sin modificarla; la solicitud del usuario inicia su implementación.
- El nombre de archivo provisto por el repositorio es `exercises.md`; `front-end.md`/`main.md` contienen la errata `excersice.md`.
- No existe especificación backend en el proyecto. No se simulan ejecución de código, inicio de sesión ni progreso.

### Validación

- `npm run build`: aprobado.
- `npm run lint`: aprobado.
- `npm run check:content`: aprobado (107 unidades, 100 retos y todas las referencias DATA existentes).
- Browser validation: navegación y recorrido de algoritmo funcionan; filtro alto/expert conserva exactamente 25 resultados del nivel elegido; detalle enlaza prerequisitos a unidades existentes.
- Chromium responsive a 320 px no presenta overflow horizontal; reducción de movimiento y teclado inspeccionados, con skip link primero y menú móvil como siguiente control.
- No se detectaron errores de página en la inspección móvil.

### Siguiente

- Ampliar el visualizador, revisar límites/pasos y accesibilidad en más navegadores y breakpoints.
- Conectar los contratos de ejecución y cuenta cuando estén definidos.

## 2026-10-14 — `CHG-001` — baseline v1.1

### Objetivo y autorización

Aplicar SDD globalmente y completar las correcciones generales, biblioteca y algoritmos solicitadas por el usuario. Se registraron DG-CHG-001–006 y escenarios en docs/specifications/CHG-001-learning-experience.md antes de editar comportamiento. El usuario difirió Lógica y Estructuras Discretas a la próxima tarea por falta de los archivos (FEAT-003).

### Cambios

- AGENTS.md exige especificación/versionado, aceptación observable y trazabilidad para todas las aplicaciones, incluyendo Dev Grid y proyectos existentes.
- Sesiones fuera de la primera versión; badge y avatar permanecen en el código ocultos. Firma de autor en el pie común.
- Categorías verticales junto a filtros; detalle sin descripción repetida.
- Parser puro para encabezados DATA de nivel 3/4 y decimales, cercas de código preservadas y título A* intacto. Corpus actualizado: 123 unidades y 100 retos.
- Renderer semántico de párrafos, listas, tablas y bloques de código; HTML siempre inerte.
- 21 lecciones con dos entradas, snapshots independientes, pseudocódigo y diagramas específicos de decisiones, ciclos o recursión.
- Hanoi configurable (2–5 discos), grafos ponderados, grilla A*, K-means, árboles Huffman y representaciones de números/tokens según algoritmo.
- Mobile-first en los nuevos layouts y discos; Tailwind/SCSS usan breakpoints px coherentes. Diagrama desplazable y centrado en su recorrido principal al abrirlo.
- Se corrigió contraste del menú y etiqueta accesible del selector móvil, detectados por navegador/axe.
- Nuevas pruebas, guías, ADR y especificaciones derivadas.

### Evidencia de aceptación

- DG-CHG-001/002: integración React y E2E verifican controles ocultos y crédito por página.
- DG-CHG-003/004/005: parser e integración verifican todas las unidades, filtros equivalentes, ausencia de resumen en encabezado, whitespace en código y HTML inerte; navegador inspecciona ejemplos reales.
- DG-CHG-006: invariantes de multiconjunto/orden, búsquedas, distancias, ruta A*, MCD/primalidad, medias K-means, decodificación RLE, códigos prefijo, movimientos Hanoi y coincidencias KMP. Playwright recorre ambos ejemplos de los 21 algoritmos.
- Vitest: 26 pruebas aprobadas; integración repetida tras el ajuste final de vista del diagrama.
- Playwright: 6 escenarios aprobados; responsive 320/768/1366 px, teclado y movimiento reducido, sin overflow. Tras el centrado final se repitieron responsive (3) y catálogo/Hanoi (2).
- Axe: sin infracciones serias/críticas en las vistas auditadas después de corregir contraste.
- Build, lint y check:content aprobados.
- Capturas móvil/escritorio inspeccionadas para Hanoi y diagrama; no errores de página durante el catálogo.

### Decisiones y límites

- La explicación sigue siendo canónica en data.md; los recorridos/pseudocódigo/flujo son material de apoyo asociado a sus IDs. ADR-0001 documenta el límite.
- Cuenta/progreso quedan para una versión posterior por el cambio aprobado de alcance.
- Ejecución de código remoto continúa pendiente de backend; matriz completa de navegadores pendiente en INIT-001.
- CHG-001 finalizado; FEAT-003 espera los archivos preparados por el usuario.
