# Backlog — Dev Grid

| ID | Estado | Objetivo | Criterios principales |
| --- | --- | --- | --- |
| `INIT-001` | In Progress | Inicializar la app Dev Grid desde `front-end.md`, `data.md` y `exercises.md`. | Biblioteca desde fuente canónica, explorador paso a paso, catálogo filtrable, detalle/práctica, responsive, documentación e historial; cerrar cuando los flujos con backend y validaciones de aceptación estén integrados. |
| `FEAT-001` | Blocked | Conectar ejecución libre y evaluación Python/PHP/JavaScript con un backend aislado. | Contrato backend disponible; separar ejecutar/evaluar; mostrar estados seguros sin filtrar pruebas ocultas y conservar el borrador ante errores. |
| `FEAT-002` | Proposed | Habilitar sesión Google opcional, progreso autenticado y su eliminación. | Contrato de sesión/progreso disponible; no persistir tokens en storage accesible a JS ni guardar código/salidas. |

## Dependencias externas

- `FEAT-001` espera la especificación y disponibilidad del servicio de ejecución aislado.
- `FEAT-002` espera el contrato backend para sesión y progreso.

## Incremento v1.1 — 2026-10-14

| ID | Estado | Objetivo | Criterios principales |
| --- | --- | --- | --- |
| `CHG-001` | Done | Correcciones generales, biblioteca y algoritmos bajo SDD. | DG-CHG-001–006: cuenta/badge ocultos, firma, categorías verticales, sin duplicación, ejemplos canónicos, todos los algoritmos gráficos con pseudocódigo/flujo y Hanoi; validación y guías. |
| `FEAT-003` | Proposed | Lógica y Estructuras Discretas de primer año UTN-FRT. | Pendiente de archivos del usuario; expresamente diferido a la siguiente tarea. |

FEAT-002 se conserva para una versión posterior: las sesiones quedaron fuera de la primera versión por instrucción del usuario en CHG-001.
