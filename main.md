# Dev Grid — Especificación principal

## 1. Estado y autoridad

- **Estado:** v1.1 autorizado para implementación incremental; baseline v1.0 conservado como origen.
- **Fuente de origen:** `dev-grid.md` y la solicitud de inicialización.
- **Autoridad:** este documento define el producto y sus reglas compartidas. `data.md` contiene el corpus educativo y `excersice.md` el catálogo de ejercicios.
- **SDD:** Required. La implementación deberá derivarse de una versión aprobada de esta especificación y de sus criterios de aceptación.
- **Derivados:** autorizados por el usuario el 2026-10-07 y cubiertos por este baseline.

## 2. Resumen del producto

Dev Grid es una aplicación pública y gratuita para aprender conceptos de programación y practicar con ejercicios. Combina una biblioteca educativa organizada por temas, recorridos paso a paso de algoritmos y una consola de práctica para Python, PHP y JavaScript.

## 3. Problema, oportunidad y valor

Quienes aprenden programación necesitan reunir explicaciones conceptuales, ejemplos de algoritmos y práctica graduada en un mismo lugar. Dev Grid busca que puedan estudiar un tema, observar cómo opera un algoritmo y resolver ejercicios relacionados con una dificultad elegida.

## 4. Objetivos y no objetivos

### Objetivos

- **MAIN-001:** Dar acceso público y gratuito al contenido educativo de la aplicación.
- **MAIN-002:** Organizar el conocimiento en categorías navegables, incluyendo fundamentos, algoritmos, estructuras de datos, paradigmas, arquitectura, patrones y buenas prácticas.
- **MAIN-003:** Presentar algoritmos con explicación y ejecución visual paso a paso; el usuario puede avanzar y retroceder para inspeccionar estados.
- **MAIN-004:** Permitir practicar ejercicios en Python, PHP o JavaScript desde una consola integrada.
- **MAIN-005:** Permitir filtrar los ejercicios por nivel: bajo, medio, alto o experto.
- **MAIN-006:** Mantener el corpus educativo y el catálogo de ejercicios en documentos fuente separados, trazables y revisables: `data.md` y `excersice.md`.
- **MAIN-018:** Ampliar el corpus educativo con conceptos relevantes del desarrollo de software, incluyendo programación asíncrona, patrones de organización de interfaces y convenciones CSS como Context/Container, Atomic Design y BEM.
- **MAIN-020:** Permitir el uso anónimo de las funciones públicas y ofrecer inicio de sesión opcional con Google; guardar progreso de aprendizaje solo para cuentas autenticadas.
- **MAIN-021:** Permitir ejecutar soluciones de usuario en Python, PHP o JavaScript, revisar su salida y evaluarlas con casos de prueba ocultos, dentro de un entorno aislado que no permita leer o modificar archivos del usuario/host ni subir archivos.
- **MAIN-022:** Entregar una aplicación web adaptable a móviles y escritorio, con la matriz de navegadores declarada en la sección de plataformas.
- **MAIN-023:** Mantener búsqueda, marcadores, rutas de aprendizaje y descarga de contenido fuera de la primera versión; registrarlos como evolución futura.

### No objetivos confirmados para la primera versión

- No se especifican cursos con certificación, tutoría humana, competencia social ni funcionalidades pagas.
- No se exige cuenta para consultar contenido ni practicar; Google es un método de acceso opcional para guardar progreso.
- No se prescribe un framework, arquitectura física, proveedor de ejecución de código ni motor de base de datos.

## 5. Usuarios y acceso

- **MAIN-007:** Cualquier persona puede acceder al contenido y las funciones incluidas sin costo.
- El perfil primario es una persona que estudia programación o repasa conceptos mediante lectura, visualización y práctica.
- El acceso público incluye consulta y práctica anónimas; Google solo es necesario para persistir el progreso de aprendizaje.

## 6. Alcance de la primera versión

### Incluido

- Biblioteca de conceptos con categorías y contenido versionable en `data.md`.
- Explicaciones y visualizaciones explorables de algoritmos; el conjunto inicial se detalla en `data.md`.
- Catálogo de al menos 100 ejercicios en `excersice.md`, cada uno con título, descripción, condiciones, resultado esperado, nivel y temas previos recomendados.
- Filtro de ejercicios por nivel bajo, medio, alto y experto.
- Consola para escribir y ejecutar soluciones en Python, PHP o JavaScript, mostrar la salida y comprobarla con pruebas visibles y ocultas.
- Inicio de sesión opcional con Google y persistencia de progreso únicamente para usuarios autenticados.
- Contenido accesible gratuitamente para todas las personas.

### Fuera de alcance por ahora

- Evaluación automática mediante una solución de referencia visible.
- Guardado de código fuente enviado a la consola, historial de ejecución, logros o perfiles públicos.
- Editor colaborativo, foros, ranking o publicación de soluciones.
- Búsqueda, marcadores, rutas de aprendizaje y descarga de contenido; se consideran evolución futura.
- Contenido de criptografía presentado como implementación de seguridad lista para producción.

## 7. Capacidades y flujos principales

### Biblioteca

1. La persona explora las categorías y abre una unidad educativa.
2. Consulta definiciones, conceptos relacionados, ejemplos de entrada/salida cuando ayuden y referencias de complejidad si aplican.
3. Navega a algoritmos o ejercicios relacionados.

### Explorador de algoritmos

1. La persona elige un algoritmo, una entrada de ejemplo y una representación disponible.
2. La aplicación muestra estado inicial, explicación y pasos sucesivos.
3. Puede avanzar y retroceder; cada paso representa un estado coherente y reproducible.
4. Al terminar, puede volver al inicio o cambiar la entrada si el algoritmo lo permite.

### Práctica

1. La persona selecciona un nivel y explora los ejercicios que lo cumplen.
2. Abre un enunciado con condiciones explícitas y resultado esperado, sin revelar una solución en el enunciado.
3. Selecciona Python, PHP o JavaScript, escribe una solución y la ejecuta en la consola.
4. Recibe la salida estándar, errores o tiempo agotado y el resultado de las comprobaciones visibles y ocultas.
5. Si inició sesión con Google, puede conservar su progreso; sin sesión, el progreso no se guarda en el servicio.

## 8. Reglas compartidas

- **MAIN-008:** Cada ejercicio debe declarar exactamente uno de los niveles `bajo`, `medio`, `alto` o `experto`.
- **MAIN-009:** Cada ejercicio debe incluir título, descripción del problema, condiciones verificables y valor o valores de resultado esperados. El enunciado no debe incluir el procedimiento de resolución.
- **MAIN-010:** Los ejercicios deben expresar datos de entrada y resultados sin depender de una implementación concreta, salvo cuando el ejercicio trate explícitamente sobre un lenguaje. Cuando un reto sea independiente del lenguaje, su semántica y sus casos de evaluación deben ser equivalentes en Python, PHP y JavaScript.
- **MAIN-011:** Las explicaciones deben distinguir hechos conceptuales de recomendaciones y señalar la complejidad con sus supuestos cuando corresponda.
- **MAIN-012:** Los ejemplos de criptografía y seguridad son educativos. No deben recomendar algoritmos caseros ni presentarse como sustitutos de bibliotecas y protocolos revisados.
- **MAIN-013:** El paso atrás de un algoritmo debe restaurar el estado anterior de la misma ejecución, y el paso adelante debe reproducir el estado siguiente.
- **MAIN-014:** El contenido común debe tener una única fuente canónica en `data.md`; los ejercicios canónicos viven en `excersice.md`. La aplicación podrá transformarlos para mostrarlos, pero no mantener copias contradictorias como fuente.
- **MAIN-019:** Cada ejercicio debe recomendar uno o más conceptos previos concretos que ayuden a prepararse para resolverlo. Esas referencias deben apuntar a unidades existentes en `data.md` cuando sea posible y deben describir prerrequisitos pedagógicos, no pasos de solución.
- **MAIN-024:** Todo código enviado por una persona se trata como no confiable y se ejecuta de forma aislada, efímera y con recursos limitados; no tiene acceso a archivos del usuario, del host ni a cargas de archivos. La configuración de límites y controles se define en `back-end.md`.
- **MAIN-025:** El contenido y la práctica básica no requieren autenticación. Para cuentas autenticadas, el progreso persistido incluye unidades marcadas como completadas y ejercicios aprobados; no incluye cada visita, el código fuente ni la salida de consola.
- **MAIN-026:** El progreso de cuenta puede consultarse y borrarse. La identidad Google se usa solo para autenticación y vínculo de datos de progreso.

## 9. Conceptos de dominio

- **Contenido educativo:** unidad explicativa categorizada y relacionada con conceptos, algoritmos o ejercicios.
- **Algoritmo:** procedimiento con entrada, pasos, salida y análisis cuando aplique.
- **Paso de algoritmo:** estado observable de una ejecución que permite avanzar y retroceder.
- **Ejercicio:** reto con identificador, categoría, nivel, descripción, restricciones, entrada y resultado esperado.
- **Tema previo recomendado:** conocimiento relacionado que conviene repasar antes de intentar un ejercicio; no implica bloquear el acceso al reto.
- **Lenguaje de práctica:** Python, PHP o JavaScript.
- **Cuenta autenticada:** identidad opcional asociada a Google que habilita almacenamiento de progreso.
- **Progreso:** marcas de avance y finalización de contenido o ejercicios; no incluye el código fuente enviado ni el historial de salidas por defecto.
- **Nivel:** bajo, medio, alto o experto. Los criterios pedagógicos de asignación se documentan en `excersice.md`.

## 10. Plataformas e integraciones

- Aplicación web adaptable a móvil y escritorio.
- Compatibilidad: las dos versiones estables más recientes de Chrome, Edge, Firefox y Safari en escritorio; Chrome para Android, Samsung Internet y Safari para iOS en móvil, siguiendo la matriz ya usada en otros proyectos del repositorio.
- Python, PHP y JavaScript deben ofrecer contratos y evaluación equivalentes para ejercicios independientes del lenguaje. Versiones concretas se fijan en el backend derivado y se muestran en la interfaz.
- Google Identity es la única integración externa aprobada para inicio de sesión opcional.

## 11. Requisitos globales

- **MAIN-015:** Toda función de consola debe limitarse al ejercicio y al entorno de ejecución aprobado; no debe exponer secretos, archivos o servicios del sistema anfitrión.
- **MAIN-016:** El material debe ser legible en español y mantener nombres técnicos reconocibles; se podrán conservar términos originales cuando mejoren la búsqueda.
- **MAIN-017:** Las interacciones de pasos deben comunicar claramente el estado actual, el inicio y el fin del recorrido.
- Los objetivos concretos de accesibilidad, rendimiento, retención y disponibilidad se definirán al derivar o al refinar este documento cuando se acuerden sus umbrales.

## 12. SDD, baseline y trazabilidad

- **Modo SDD:** Required.
- **Baseline actual:** v1.1, 2026-10-14; incremento autorizado por la solicitud de correcciones. Baseline de origen v1.0, 2026-10-07. La implementación requiere estos derivados y escenarios SDD.
- Todo cambio de comportamiento compartido se realiza primero aquí y mantiene IDs estables.
- `data.md` y `excersice.md` son fuentes de contenido del producto y deben referenciar los requisitos que satisfacen cuando corresponda.
- Las pruebas futuras deben derivarse de criterios y escenarios aprobados; esta especificación no implementa ni ejecuta pruebas.
- `front-end.md` y `back-end.md` se crearán únicamente tras la aprobación explícita del baseline.

## 13. Criterios de aceptación del producto

- **MAIN-AC-001:** Dado que una persona abre el contenido público, cuando consulta una categoría educativa, entonces puede leer sus unidades sin pagar.
- **MAIN-AC-002:** Dado que una persona elige un algoritmo con recorrido visual, cuando avanza y retrocede, entonces ve estados sucesivos y previos coherentes de la misma ejecución.
- **MAIN-AC-003:** Dado que el catálogo contiene ejercicios de los cuatro niveles, cuando se elige un nivel, entonces solo aparecen ejercicios asignados a ese nivel.
- **MAIN-AC-004:** Dado un ejercicio, cuando se abre su enunciado, entonces aparecen título, descripción, condiciones, resultado esperado y temas previos recomendados, sin incluir una solución de referencia como parte del enunciado.
- **MAIN-AC-005:** Dado que la consola admite un lenguaje, cuando se selecciona Python, PHP o JavaScript, entonces la persona puede ingresar código, ver su salida y conocer el resultado de pruebas visibles y ocultas sin exponer archivos ni servicios del host.
- **MAIN-AC-006:** Dado el corpus inicial, cuando se valida el catálogo, entonces `excersice.md` contiene al menos 100 ejercicios completos y cada uno declara uno de los cuatro niveles.
- **MAIN-AC-007:** Dado cualquier ejercicio del catálogo, cuando una persona consulta su enunciado, entonces encuentra al menos un tema previo recomendado y puede relacionarlo con el contenido educativo.
- **MAIN-AC-008:** Dado un ejercicio independiente del lenguaje, cuando se resuelve en Python, PHP o JavaScript, entonces el contrato y los resultados aceptados son equivalentes en los tres lenguajes.
- **MAIN-AC-009:** Dada una persona sin sesión, cuando consulta contenido y practica, entonces puede completar esos flujos sin autenticarse y el servicio no persiste su progreso.
- **MAIN-AC-010:** Dada una persona con Google autenticado, cuando marca avance o finalización, entonces el progreso queda asociado a su cuenta y puede consultarlo y borrarlo.
- **MAIN-AC-011:** Dado código malicioso o una petición de acceso a archivos, red o recursos excesivos, cuando se ejecuta, entonces queda contenido dentro de los límites y no accede al host ni a archivos cargados.
- **MAIN-AC-012:** Dado un viewport móvil o de escritorio en los navegadores acordados, cuando se recorren biblioteca, visualizador y ejercicios, entonces las funciones esenciales siguen disponibles sin pérdida de contenido.

## 14. Decisiones, supuestos y preguntas

### Decisiones confirmadas

- App pública y gratuita; contenidos disponibles para cualquiera.
- Biblioteca educativa, algoritmos paso a paso reversibles, ejercicios filtrables por nivel y consola para Python, PHP y JavaScript.
- El usuario solicita mantener el contenido educativo y los ejercicios en documentos separados.
- Acceso anónimo a las funciones públicas; login Google opcional; persistencia de progreso solo con sesión.
- Consola con ejecución, salida, pruebas visibles y ocultas, aislamiento fuerte, sin cargas ni acceso a archivos del usuario/host.
- Web responsive móvil/escritorio; matriz de navegadores heredada de otros proyectos.
- Los tres lenguajes tendrán evaluación equivalente para retos neutrales; búsqueda, marcadores, rutas y descargas se difieren como evolución.

### Supuestos explícitos

- **A-001:** El contenido inicial estará redactado en español.
- **A-002:** El catálogo inicial tendrá 100 ejercicios repartidos entre los cuatro niveles, con 25 por nivel para asegurar cobertura equilibrada.
- **A-003:** “Resultado esperado” significa salida o propiedad observable verificable para casos definidos, no código de solución.
- **A-004:** `excersice.md` es el nombre solicitado: la petición lo menciona también como `excersices.md`, pero termina especificando `excersice.md`.
- **A-005:** El catálogo de conocimiento inicial cubrirá las áreas enumeradas en `dev-grid.md` y añadirá fundamentos complementarios claramente relacionados, sin afirmar que agota todo el conocimiento de programación.
- **A-006:** Para acotar la ejecución segura, el backend aplicará límites por ejecución, sin red pública, sin volúmenes de usuario, con sistema de archivos de runtime inmutable y límites de tiempo, memoria, procesos, entrada y salida. Los valores iniciales se detallan en `back-end.md` y podrán ajustarse con evidencia operativa sin cambiar el resultado pedagógico.
- **A-007:** La matriz de navegador móvil queda representada por Chrome Android, Samsung Internet y Safari iOS; la validación física de dispositivos queda por definir en etapa frontend si resulta necesaria.

### Preguntas abiertas

- No quedan preguntas bloqueantes para generar los derivados. La matriz detallada de límites de ejecución y su ajuste operativo quedan en `back-end.md` bajo A-006.

### Ideas diferidas

- Rutas personalizadas, búsqueda, marcadores, descarga de contenido, contribuciones comunitarias, retos temporizados, ranking, certificados y traducciones.

## Incremento autorizado v1.1 — 2026-10-14

La solicitud de correcciones del usuario autoriza el incremento [CHG-001](docs/specifications/CHG-001-learning-experience.md). Este incremento prevalece sobre el alcance anterior para los cambios enumerados:

- Primera versión sin sesiones: Google y progreso personal de MAIN-020/025/026 se difieren; acceso y práctica siguen públicos. La presentación de cuenta y el badge de acceso permanecen en código, ocultos.
- Navegación vertical adicional de categorías, conceptos sin descripción duplicada y ejemplos canónicos formateados.
- Todos los algoritmos del corpus con representación gráfica, pseudocódigo y diagrama de flujo; ejemplos alternativos y Hanoi con discos configurables.
- Firma de cada página: Desarrollado por DevHoyosJuan.
- Lógica y Estructuras Discretas UTN-FRT se difiere por instrucción del usuario a otra tarea, al recibir los archivos.

La ejecución aislada y su evaluación conservan los requisitos MAIN-021/024; su integración continúa dependiendo de backend.
