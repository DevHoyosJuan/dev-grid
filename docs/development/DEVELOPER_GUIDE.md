# Guía de desarrollo — Dev Grid

## Stack y comandos

React 19, TypeScript, Vite, Tailwind CSS 4, SCSS y Lucide. Las fuentes tipográficas se sirven localmente; no se agregaron dependencias para Markdown o diagramas.

- `npm install`: dependencias.
- `npm run dev -- --port 4178`: preview local usada por la validación.
- `npm run build`: tipos y bundle de producción.
- `npm run lint`: análisis estático.
- `npm test`: Vitest (dominio, contenido e integración React).
- `npm run test:e2e -- --workers=1`: Chromium, responsive y axe.
- `npm run check:content`: integridad de IDs/prerequisitos del corpus; no fija el total de unidades.

## SDD y trazabilidad

SDD es obligatorio según el AGENTS.md global. El baseline actual es main.md/front-end.md v1.1. El incremento CHG-001 vive en docs/specifications/CHG-001-learning-experience.md con requisitos DG-CHG y escenarios observables. Actualizar la especificación antes de implementar una variación de comportamiento; conservar IDs y evidencia en STATUS/WORKLOG. Una instrucción explícita del usuario autoriza el incremento descrito.

## Mapa y límites

- `src/app/App.tsx`: composición y navegación pública, filtros y práctica existente.
- `src/content/parseContent.ts`: transformación pura de Markdown a contratos tipados.
- `src/content/education.ts`: adaptador Vite `?raw` de los documentos fuente.
- `src/content/types.ts`: unidades y contratos de ejercicios.
- `src/shared/MarkdownContent.tsx`: bloques semánticos de texto, código, listas y tablas; nunca interpreta HTML.
- `src/features/library/LibraryPage.tsx`: categorías, catálogo y lectura.
- `src/features/algorithms/algorithmDomain.ts`: procedimientos puros, snapshots, pseudocódigo y planes de flujo.
- `src/features/algorithms/AlgorithmExplorer.tsx`: estado local, elección de entradas y coordinación del recorrido.
- `src/features/algorithms/GraphicState.tsx`: representaciones por dominio (arreglo, grafos, grilla, puntos, tokens, árboles, números y Hanoi).
- `src/features/algorithms/FlowDiagram.tsx`: SVG para decisiones/ramas/bucles/recursión; backtracking incluye objetivo y poda como decisiones distintas.
- `src/styles/index.css`: tokens y breakpoints Tailwind en px; `app.scss`: visuales de componentes, diagramas y responsive.
- `e2e/learning.spec.ts`: journeys y auditorías; `playwright.config.ts`: webserver y Chromium.

Los algoritmos no importan React, red ni almacenamiento. La presentación solo recorre snapshots ya calculados. Cada snapshot copia el estado mutable de trabajo para preservar avance/retroceso. Hanoi admite 2–5 discos; ejemplos solo 0 o 1. Las entradas de cada ejemplo son explícitas y reproducibles.

## Corpus y ejemplos

Vite incorpora `data.md`/`exercises.md` como texto y el adaptador los interpreta al inicializar el módulo. El lector reconoce DATA con IDs decimales y encabezados de nivel 3/4, y respeta cercas de código. Preserva el cuerpo original; la vista renderiza ejemplos sin duplicar el resumen del detalle. El corpus actual contiene 123 unidades y 100 retos. El catálogo gráfico cubre DATA-061–080 y DATA-107.

Pseudocódigo, diagramas y entradas son material de apoyo del ejemplo ejecutable; la explicación fuente sigue en data.md. Al incorporar otro algoritmo, agregar su lección/generador junto con pruebas y validar que el catálogo de lecciones coincide con el corpus. El test de cobertura impide promover un algoritmo sin representación.

## Privacidad e integraciones

La primera versión no ofrece sesiones. `releaseFeatures.accountControls=false` preserva las piezas de cabecera bajo `hidden`, sin exposición visual ni foco. Autenticación/progreso siguen como evolución posterior. No hay llamadas de ejecución remota; el editor guarda su borrador solamente en estado React. Los futuros resultados de ejecución deben ser texto seguro; no revelar casos ocultos ni almacenar código en logs/analytics/storage.

## Accesibilidad, responsive y pruebas

Los controles son nativos y tienen nombre/foco visible. Filtros y algoritmo elegido comunican `aria-pressed`; los mensajes de paso usan `aria-live=polite`. Los gráficos ofrecen descripción textual y los diagramas figcaption. Código, tablas y diagramas pueden desplazarse dentro de contenedores identificados; la página debe caber en 320 px. El menú cerrado usa visibility:hidden para salir del orden de foco.

Tailwind y SCSS comparten 620, 820, 1120 y 1450 px; los breakpoints no usan rem/em. Los nuevos layouts usan utilidades; los discos, grafos, árboles y diagramas usan estilos de representación. Respetar prefers-reduced-motion.

Las pruebas unitarias verifican invariantes (multiconjunto/orden, distancias, búsqueda, RLE, códigos prefijo, centros medios, Hanoi, KMP). Integración cubre categorías, ejemplos, ocultamiento de cuenta y reversibilidad. E2E verifica ambos ejemplos de todos los algoritmos, Hanoi, teclado, 320/768/1366 px y accesibilidad automatizada. Axe no sustituye revisión visual/manual.

## Extensión segura

1. Especificar el cambio y sus escenarios; registrar ID de backlog.
2. Revisar corpus, límites puros y primitivas antes de agregar abstracciones o paquetes.
3. Implementar estados y mantener ejemplos/pseudocódigo/flujo alineados.
4. Ejecutar verificaciones relevantes y revisar navegador.
5. Actualizar guías, STATUS, WORKLOG y CHANGELOG con evidencia concreta.
