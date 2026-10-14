# Estado — Dev Grid

## Completado

- `CHG-001` / baseline SDD v1.1: correcciones generales, biblioteca y catálogo completo de algoritmos.
- AGENTS.md global exige SDD en todos los proyectos; requisitos y escenarios registrados antes de implementar.
- Badge “Acceso abierto” y controles de cuenta conservados detrás de una bandera deshabilitada, fuera de la vista y del foco.
- Firma “Desarrollado por DevHoyosJuan” en todas las páginas.
- Biblioteca con filtros horizontales y listado vertical de categorías; detalle sin resumen duplicado.
- Corpus actualizado: 123 unidades, incluidos IDs fraccionales, encabezados de nivel 4, ejemplos indentados, listas y tablas.
- 21 algoritmos: dos entradas por algoritmo, estados gráficos reversibles, pseudocódigo y diagramas de flujo específicos.
- Hanoi con 2–5 discos y movimientos legales; representaciones dedicadas para grafos, A*, puntos K-means, Huffman, RLE y KMP.
- Diagramas legibles con desplazamiento interno en móvil e inicio centrado en el recorrido principal.
- Guías, especificaciones, backlog, changelog, worklog y ADR de contenido/snapshots actualizados.

## En progreso

- `INIT-001`: ejecución y evaluación remota siguen pendientes del servicio backend seguro.

## Siguiente

- `FEAT-003`: Lógica y Estructuras Discretas UTN-FRT, diferida explícitamente por el usuario a la próxima tarea, al preparar los archivos.
- `FEAT-001`: integración del contrato de ejecución aislada y evaluación.
- `FEAT-002`: sesión Google/progreso para una versión posterior; fuera de la primera versión.

## Bloqueadores y límites

- No hay contrato/servicio backend para ejecutar o evaluar código; controles de ejecución conservan su estado deshabilitado.
- Google/progreso ya no son requisitos de esta primera versión.
- No se recibió material UTN-FRT; no se creó contenido atribuido al curso ni una sección vacía.
- La validación de navegador de CHG-001 cubre Chromium; la matriz completa del producto continúa pendiente dentro de INIT-001.

## Validación de CHG-001

- Build, lint e integridad de contenido aprobados: 123 unidades, 100 retos y prerequisitos resolubles.
- Vitest: 26 pruebas aprobadas en 3 archivos; integración repetida después del ajuste final de centrado.
- Playwright: 6 escenarios aprobados, con ambos ejemplos de cada uno de los 21 algoritmos, límites y reversibilidad de Hanoi, navegación/categorías y responsive 320/768/1366 px.
- Tras el centrado final, se repitieron los 3 escenarios responsive y los 2 escenarios de catálogo/Hanoi.
- Axe: sin infracciones serias/críticas en detalle de biblioteca y Hanoi tras corregir el contraste del menú.
- Capturas de escritorio y móvil inspeccionadas; sin overflow horizontal de página y sin errores de página en el recorrido del catálogo.
