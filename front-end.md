# Dev Grid — Especificación frontend

## 1. Estado, derivación y baseline cubierto

- **Etapa:** especificación derivada del frontend.
- **Estado:** implementación incremental autorizada, v1.1.
- **Baseline cubierto:** `main.md` v1.1, autorizado el 2026-10-14; origen v1.0 del 2026-10-07.
- **SDD:** Required, heredado del proyecto. No iniciar implementación contra un baseline posterior sin actualizar esta especificación.
- **Fuentes de contenido:** `data.md` (conceptos y algoritmos) y `excersice.md` (retos). Esos documentos son canónicos para sus contenidos.
- **Alcance derivado:** materializa `MAIN-001` a `MAIN-026` según las referencias de cada requisito. No redefine reglas compartidas.

## 2. Objetivo y alcance frontend

Entregar una experiencia web adaptable en español para explorar conceptos, recorrer algoritmos de manera interactiva y practicar retos en Python, PHP o JavaScript. El usuario puede leer y practicar sin iniciar sesión. La sesión opcional con Google habilita la consulta y persistencia de progreso personal.

### Incluye

- Navegación por biblioteca, categorías, conceptos y algoritmos.
- Visualizador de algoritmos con controles para avanzar, retroceder, reiniciar y cambiar entradas cuando estén habilitadas.
- Catálogo de ejercicios con filtro por nivel, detalle, prerequisitos y consola.
- Ejecución libre con entrada estándar visible y evaluación separada contra pruebas, incluidas pruebas ocultas.
- Acceso anónimo y flujo opcional de inicio/cierre de sesión Google.
- Vista de progreso únicamente para personas autenticadas.

### Excluye en esta etapa

- Búsqueda global, marcadores, rutas de aprendizaje, descarga de contenidos, perfiles públicos y compartir soluciones.
- Guardar el código escrito o historial de ejecuciones.
- Construir las reglas de aislamiento de ejecución en el cliente; el frontend solo usa el servicio que provee backend y muestra estados devueltos.

## 3. Decisiones, supuestos y preguntas frontend

### Decisiones heredadas

- El acceso público y la práctica no se bloquean por autenticación (`MAIN-001`, `MAIN-007`, `MAIN-020`, `MAIN-025`).
- Solo Google habilita el guardado de progreso; el código fuente y las salidas de consola no se guardan como historial (`MAIN-020`, `MAIN-025`, `MAIN-026`).
- Las experiencias deben ser adaptables a móviles y escritorio y cubrir la matriz de navegadores de `MAIN-022`.
- Los retos neutrales a lenguaje mantienen semántica y expectativas equivalentes en los tres lenguajes (`MAIN-010`, `MAIN-021`).

### Supuestos frontend

- **FE-A-001:** La interfaz inicia en español. Conserva términos técnicos y nombres originales que aparecen en `data.md`.
- **FE-A-002:** La sesión autenticada debe sobrevivir recargas mediante el mecanismo seguro de sesión definido por backend, sin almacenar credenciales de Google ni tokens de larga duración en almacenamiento accesible a JavaScript.
- **FE-A-003:** En escritorio el editor y la consola pueden mostrarse en paneles simultáneos; en pantallas estrechas se presentan en flujo vertical o pestañas sin perder estado de edición durante una ejecución.
- **FE-A-004:** Los resultados de evaluación muestran resumen y fallos comprensibles, pero no contenido de casos ocultos ni valores esperados ocultos.

### Preguntas abiertas

- No hay decisiones bloqueantes de producto para implementar el frontend. Diseño visual, paleta, tipografía, framework y breakpoints concretos no están aprobados como restricciones; resolverlos durante diseño/implementación respetando los resultados descritos aquí.

## 4. Arquitectura de información y navegación

### Secciones principales

1. **Biblioteca:** categorías del corpus, listado de unidades y detalle educativo.
2. **Algoritmos:** algoritmos agrupados por las familias de `data.md`, con acceso al visualizador si existe una animación/recorrido disponible.
3. **Ejercicios:** selector de nivel, catálogo de retos y detalle con práctica.
4. **Progreso:** visible solo con sesión autenticada; resume unidades y ejercicios completados.
5. **Cuenta:** entrar con Google o ver estado autenticado/cerrar sesión. No crear perfil público.

No se agrega búsqueda global, favoritos ni rutas de aprendizaje en esta versión (`MAIN-023`). Una navegación por categorías siempre debe permitir regresar a la lista anterior y comunicar la sección actual.

## 5. Flujos y pantallas

### F-01 — Consultar la biblioteca

1. Entrar a Biblioteca y elegir una categoría.
2. Ver las unidades disponibles y abrir una.
3. Leer explicación, vocabulario, complejidad y ejemplos que existan en la fuente.
4. Seguir relaciones disponibles hacia otras unidades, algoritmos o ejercicios.

### F-02 — Explorar un algoritmo

1. Elegir algoritmo y revisar su objetivo, entradas y condiciones de aplicación.
2. Ver el estado inicial y el paso actual con su explicación.
3. Avanzar, retroceder o reiniciar. Deshabilitar avanzar/retroceder cuando no haya paso válido.
4. Si el algoritmo permite entrada configurable, validar esa entrada antes de reiniciar el recorrido.
5. Respetar `prefers-reduced-motion`; la animación puede reducirse o sustituirse por actualización instantánea sin alterar los controles de paso.

### F-03 — Elegir y resolver un ejercicio

1. Abrir Ejercicios y elegir exactamente uno de los niveles: bajo, medio, alto o experto.
2. Mostrar solo los ejercicios de ese nivel; el filtro puede limpiarse para regresar al catálogo completo.
3. Abrir un ejercicio y presentar título, nivel, categoría, descripción, condiciones, resultado esperado pedagógico y temas previos recomendados enlazados a Biblioteca (`MAIN-009`, `MAIN-019`).
4. Elegir Python, PHP o JavaScript; el mismo ejercicio ofrece los tres lenguajes, salvo que su enunciado indique explícitamente una restricción lingüística.
5. Escribir o pegar código en el editor y, opcionalmente, entrada estándar. No ofrecer adjuntar/subir archivos (`MAIN-021`, `MAIN-024`).
6. **Ejecutar:** enviar el programa y entrada de la persona para ver stdout, stderr, terminación o límites alcanzados. Esta acción no afirma que el ejercicio esté resuelto.
7. **Evaluar:** ejecutar los casos de evaluación del ejercicio. Mostrar aprobado/no aprobado y un resumen; nunca revelar entrada, salida esperada ni detalle que permita reconstruir casos ocultos.
8. Mostrar errores de sintaxis, ejecución, tiempo, memoria, salida excedida, límite de solicitudes o indisponibilidad con una acción comprensible para recuperarse.
9. Si la evaluación aprueba y hay sesión, sincronizar el progreso. Si no hay sesión, conservar la práctica en pantalla durante la sesión actual sin prometer persistencia remota.

### F-04 — Iniciar sesión y consultar progreso

1. Una persona anónima puede iniciar el flujo Google desde Cuenta o desde un mensaje no bloqueante de progreso.
2. Si cancela, vuelve a la experiencia anónima en la pantalla previa.
3. Si Google/backend rechazan el acceso, explicar el fallo sin perder el ejercicio ni el código aún presente en la memoria de la página.
4. Con sesión, abrir Progreso y ver marcadores de unidades completadas y ejercicios aprobados.
5. Cerrar sesión sin borrar progreso del servidor; el borrado de progreso se ofrece mediante una acción separada, con confirmación y resultado claro.

## 6. Requisitos funcionales frontend

### FE-001 — Navegar el corpus (`MAIN-001`, `MAIN-002`, `MAIN-016`)

Presentar categorías y contenido de `data.md` en español; mostrar definiciones, supuestos, complejidad y relaciones cuando existan. No inventar entradas educativas que contradigan o dupliquen la fuente.

### FE-002 — Controlar el recorrido algorítmico (`MAIN-003`, `MAIN-013`, `MAIN-017`)

Mostrar estado inicial, progreso/paso actual, descripción del paso y controles anterior, siguiente y reiniciar. Los controles reflejan correctamente el inicio/fin y mantienen una ejecución determinista al recorrerla en ambos sentidos.

### FE-003 — Filtrar y presentar ejercicios (`MAIN-005`, `MAIN-008`, `MAIN-009`, `MAIN-019`)

Filtrar por nivel sin mezclar resultados. Cada ficha y detalle muestra los campos canónicos y referencias de temas previos. No incluir procedimientos de resolución ni soluciones de referencia junto al enunciado.

### FE-004 — Seleccionar lenguaje y ejecutar (`MAIN-004`, `MAIN-010`, `MAIN-021`)

Proveer editor y selección de lenguaje para Python, PHP y JavaScript. Separar las acciones de ejecutar libremente y evaluar. Renderizar salida como texto no confiable, nunca interpretarla como HTML. No ofrecer transferencia de archivos.

### FE-005 — Mostrar feedback de evaluación (`MAIN-009`, `MAIN-010`, `MAIN-021`)

Mostrar el resultado global y, cuando se autorice, resultados de ejemplos visibles. Para pruebas ocultas, comunicar únicamente el resumen seguro que devuelva backend. No calcular el estado de aprobado con lógica local.

### FE-006 — Mantener acceso anónimo y autenticación opcional (`MAIN-007`, `MAIN-020`, `MAIN-025`)

Permitir leer y practicar sin sesión. Presentar Google como opción para persistir progreso, no como requisito ni como mecanismo para enviar código a Google. Los estados de cuenta se obtienen de backend.

### FE-007 — Mostrar y modificar progreso (`MAIN-020`, `MAIN-025`, `MAIN-026`)

Con sesión, mostrar progreso sincronizado y ofrecer borrado de progreso. Sin sesión, ocultar vista personal y no crear marcadores persistentes en backend. No almacenar código, salida o input de consola como parte del progreso.

### FE-008 — Errores, estados y recuperación (`MAIN-015`, `MAIN-021`, `MAIN-024`)

Cubrir carga, vacío, error de red, sesión vencida, ejecución pendiente, timeout, interrupción, salida truncada, evaluación fallida e indisponibilidad. Permitir reintentar acciones seguras sin duplicar una ejecución aprobada ni descartar código del editor.

## 7. Datos y dependencias de backend

La interfaz necesita contratos lógicos para:

- Categorías, unidades, algoritmos y pasos de visualización procedentes de los documentos canónicos.
- Catálogo de ejercicios con ID, título, categoría, nivel, enunciado, condiciones, temas previos y lenguaje permitido.
- Solicitud de ejecución: ID de ejercicio, lenguaje/versión, código fuente como texto y entrada estándar limitada.
- Resultado de ejecución: estado, stdout/stderr acotados, código de salida cuando corresponda, tiempo consumido y razón segura de rechazo/interrupción.
- Resultado de evaluación: aprobado/no aprobado, resumen por cantidad de pruebas visibles/ocultas y feedback seguro sin filtración de casos ocultos.
- Estado de sesión y progreso sincronizado para la cuenta actual.

Los nombres de rutas, verbos HTTP, tokenización y formato final quedan en el contrato backend; frontend no debe inferir contratos incompatibles. El código permanece en memoria del cliente hasta que la persona abandona o refresca; advertir antes de perderlo solo cuando exista una acción destructiva del propio frontend.

## 8. Responsive y comportamiento por navegador

- Escritorio: dos últimas versiones estables de Chrome, Edge, Firefox y Safari en la fecha de entrega.
- Móvil: Chrome Android, Samsung Internet y Safari iOS; priorizar lectura y uso de la consola en pantallas estrechas.
- La disposición debe adaptarse sin exigir desplazamiento horizontal de página en 320 px de ancho; contenido de código puede tener desplazamiento interno identificado.
- Controles táctiles y de teclado disponibles. No depender de hover para información o acciones esenciales.
- Si el navegador no soporta un detalle de editor/visualización, conservar edición, lectura y flujo de práctica mediante una alternativa funcional.
- Validar diseño al 200 % de zoom y texto ampliado sin pérdida de acciones esenciales.

## 9. Accesibilidad, privacidad, rendimiento y resiliencia

- Usar estructura semántica, foco visible, orden de tabulación lógico, etiquetas para editor/controles, mensajes de error asociados y anuncios de estado no intrusivos.
- La visualización debe ofrecer descripción textual de los estados; animación no puede ser la única explicación. Respetar reducción de movimiento.
- Contraste legible para texto, código, selección, estado de error y resultado; no comunicar aprobado/fallido solo con color.
- No incluir credenciales Google ni guardar tokens en `localStorage`/`sessionStorage` sin aprobación de un contrato de autenticación seguro.
- No enviar el código a analytics, logs del cliente o telemetría de contenido; no registrar inputs ni outputs de consola.
- Mantener biblioteca navegable ante fallo del servicio de progreso o de ejecución. Explicar qué servicio está temporalmente indisponible.
- Para cambios de lenguaje o ejercicio con código escrito, preservar el borrador en memoria mientras no se navegue fuera o recargue.

## 10. SDD: escenarios derivados y trazabilidad

- **SDD-FE-001** (`MAIN-001`, `MAIN-002`, `MAIN-016`): Dado un visitante sin sesión, cuando abre Biblioteca y una unidad, entonces puede leerla en español sin pedir autenticación.
- **SDD-FE-002** (`MAIN-003`, `MAIN-013`, `MAIN-017`): Dado un algoritmo con pasos, cuando la persona avanza y retrocede, entonces el estado visible corresponde al paso actual y los controles respetan límites.
- **SDD-FE-003** (`MAIN-005`, `MAIN-008`): Dado el catálogo completo, cuando la persona selecciona nivel alto, entonces todas las fichas mostradas tienen nivel alto y no se mezclan otros niveles.
- **SDD-FE-004** (`MAIN-009`, `MAIN-019`): Dado el detalle de un reto, cuando se presenta, entonces aparecen sus temas previos enlazados y el enunciado no muestra el procedimiento de solución.
- **SDD-FE-005** (`MAIN-004`, `MAIN-010`, `MAIN-021`): Dado un ejercicio neutral a lenguaje, cuando se cambia entre los tres lenguajes, entonces se conservan el mismo contrato y los criterios de aprobado.
- **SDD-FE-006** (`MAIN-021`, `MAIN-024`): Dado un resultado de ejecución con texto hostil, cuando la interfaz lo presenta, entonces lo muestra como texto y no ejecuta ni interpreta el contenido.
- **SDD-FE-007** (`MAIN-020`, `MAIN-025`): Dado un visitante anónimo, cuando completa una evaluación, entonces puede ver su resultado pero backend no registra progreso asociado a una cuenta.
- **SDD-FE-008** (`MAIN-020`, `MAIN-025`, `MAIN-026`): Dada una cuenta Google, cuando aprueba un ejercicio, entonces el progreso sincronizado se actualiza y puede consultarse o borrarse.
- **SDD-FE-009** (`MAIN-022`): Dado un viewport/navegador cubierto, cuando la persona recorre biblioteca, visualizador y práctica, entonces conserva acceso a las funciones esenciales.
- **SDD-FE-010** (`MAIN-023`): Dado el primer release, cuando se navega, entonces no se presenta búsqueda global, marcador, ruta o descarga como función disponible.

## 11. Criterios de aceptación frontend

- **FE-AC-001:** Las secciones Biblioteca, Algoritmos y Ejercicios permiten completar sus flujos de lectura, exploración y práctica.
- **FE-AC-002:** El filtro por nivel retorna solo retos del nivel elegido y mantiene vacíos/cargas/errores comprensibles.
- **FE-AC-003:** Todo detalle de ejercicio presenta campos canónicos y prerequisitos enlazados a contenidos existentes.
- **FE-AC-004:** La consola permite seleccionar los tres lenguajes, ejecutar y evaluar con salidas claramente diferenciadas.
- **FE-AC-005:** El feedback oculto no revela inputs, outputs esperados ni datos que permitan inferir pruebas protegidas.
- **FE-AC-006:** Una persona sin sesión puede usar contenido y práctica; Google es opcional y el progreso no se persiste sin sesión.
- **FE-AC-007:** La vista autenticada permite consultar y borrar progreso, y no muestra historial de código fuente.
- **FE-AC-008:** Biblioteca y controles siguen operables en matriz de navegadores, móvil/escritorio, teclado, zoom 200 % y reducción de movimiento.
- **FE-AC-009:** Estados de timeout, rechazo, salida truncada, desconexión y sesión vencida se comunican sin ejecutar salida como HTML ni perder código escrito por un error de respuesta.

## 12. Definición de listo frontend

- Cada requisito y escenario tiene trazabilidad a `MAIN-*`.
- Contenido se carga desde fuentes canónicas sin duplicar definiciones locales contradictorias.
- Flujos anónimo, Google, biblioteca, visualizador, ejecución, evaluación y progreso se han validado en la matriz aprobada.
- Accesibilidad de teclado, estados, zoom, reducción de movimiento y texto de salida no confiable está comprobada.
- No hay controles visibles para búsqueda, marcadores, rutas o descargas en el alcance inicial.
- La revisión y aceptación del frontend se realiza antes de promover la especificación a baseline de implementación correspondiente.

## Incremento frontend v1.1 — 2026-10-14

La solicitud explícita de correcciones autoriza [CHG-001](docs/specifications/CHG-001-learning-experience.md), derivado del incremento de main.md del mismo día. Esta especificación pasa de planificación a implementación incremental autorizada. Los requisitos DG-CHG-001 a DG-CHG-006 y sus escenarios detallados rigen esta entrega.

FE-006 y FE-007 se conservan para evolución posterior; la primera versión oculta los controles de cuenta y acceso y no ofrece sesiones. FE-001 amplía su representación para preservar ejemplos de código, listas y tablas del nuevo data.md. FE-002 incluye todos los algoritmos del catálogo, KMP, ejemplos alternativos, pseudocódigo y diagramas de flujo. Lógica UTN-FRT se registra para la próxima tarea y no se incorpora en esta entrega.
