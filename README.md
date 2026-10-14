# Dev Grid

Dev Grid es una experiencia pública en español para estudiar conceptos de programación, recorrer algoritmos y practicar retos por nivel. El contenido se obtiene de los documentos fuente `data.md` y `exercises.md`.

## Desarrollo local

```bash
npm install
npm run dev
```

## Documentación

- [Guía de usuario](docs/user/USER_GUIDE.md)
- [Guía de desarrollo](docs/development/DEVELOPER_GUIDE.md)
- [Especificación principal](main.md)
- [Especificación frontend](front-end.md)
- [Estado actual](STATUS.md)
- [Registro de cambios](CHANGELOG.md)

La especificación es el alcance aprobado. Esta primera entrega inicia los flujos públicos de biblioteca, algoritmos y catálogo; ejecución remota, autenticación y progreso requieren sus contratos backend.

## Incremento SDD v1.1

Ver [CHG-001 y escenarios de aceptación](docs/specifications/CHG-001-learning-experience.md). La aplicación interpreta el corpus actualizado (123 unidades), conserva los 100 ejercicios y ofrece 21 algoritmos con dos ejemplos, representación gráfica, pseudocódigo y diagrama de flujo. Hanoi permite entre 2 y 5 discos. La primera versión no tiene sesiones; los controles de cuenta permanecen ocultos para una evolución posterior.
