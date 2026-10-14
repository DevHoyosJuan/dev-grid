# ADR-0001 — Contenido canónico y recorridos deterministas

## Status

Accepted — 2026-10-14, CHG-001.

## Context

El corpus actualizado contiene ejemplos extensos, IDs decimales y encabezados de algoritmos a distinto nivel. Los recorridos deben restaurar estados anteriores y cubrir dominios diferentes: arreglos, grafos, recursión, árboles y compresión. Se requiere pseudocódigo y diagrama sin ejecutar el código de los ejemplos fuente.

## Decision

Preservar data.md como contenido canónico mediante un parser puro y un adaptador Vite. Renderizar Markdown en nodos React explícitos (sin HTML ejecutable). Mantener generadores puros por algoritmo con snapshots independientes, entradas explícitas, pseudocódigo y planes de flujo. Renderizar SVG/HTML según el dominio; los diagramas de decisiones y recursión no requieren servicios externos ni bibliotecas adicionales.

## Alternatives considered

- Copiar el corpus a fichas TS: agrega mantenimiento duplicado y riesgo de contenido obsoleto.
- Ejecutar los ejemplos fuente como programas: mezcla contenido con ejecución no confiable y depende de backend.
- Una biblioteca de diagramas completa: añade dependencia sin necesidad para estos flujos acotados.
- Reutilizar barras para todos los algoritmos: no explica estados de Hanoi, grafos ni codificación.

## Consequences

Cada nuevo algoritmo necesita lección, generador y evidencia de invariantes. El test compara el catálogo canónico con las lecciones para detectar cobertura faltante. Los estados son reproducibles y reversibles; los visuales se pueden cambiar sin alterar el dominio. El renderer cubre las construcciones presentes en el corpus, no pretende implementar todo CommonMark.
