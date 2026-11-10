# Laboratorio III — Frontend Angular 20

Continuación del backend del Laboratorio II, con **cuatro páginas CRUD completas**: Estudiantes, Cursos (del backend original) y Profesores, Salones (los dos módulos nuevos).

## Ejecutar

1. En una terminal de `Backend`, conservar la configuración de Docker que ya funciona en el computador; ejecutar `npm start` (requiere PostgreSQL levantado).
2. En otra terminal, entrar a `Frontend`, ejecutar `npm install` y luego `npm start`.
3. Abrir <http://localhost:4200> en el navegador.

La conexión usa `http://localhost:3000/api` en `src/app/core/api.config.ts`. **No usa mocks, arreglos de datos ni localStorage.**

## Funciones y rutas

Por cada recurso (`students`, `courses`, `professors`, `classrooms`):

- `/<recurso>`: listado (GET ALL) y botón Eliminar (DELETE)
- `/<recurso>/new`: formulario de creación (POST)
- `/<recurso>/:id`: página de detalle (GET BY ID)
- `/<recurso>/:id/edit`: formulario de actualización (PUT)

Cada recurso tiene su **NgModule**, módulo de rutas, servicio HttpClient, modelo TypeScript y páginas separadas (`list`, `detail`, `form`). Bootstrap proporciona la interfaz de usuario.

### Campos reales del backend

- Estudiantes: ID ingresado manualmente, nombre, email, teléfono (10 dígitos), dirección, fecha de nacimiento, semestre y estado.
- Cursos: nombre, descripción, créditos, semestre y estado (ID automático).
- Profesores: nombre, email, departamento y estado (ID automático).
- Salones: nombre, edificio, capacidad y estado (ID automático).

## Comprobación de la entrega

Ejecutar las cinco operaciones CRUD de **Profesores y Salones** en Angular, verificar los resultados en la API y tomar capturas reales. Preparar el PDF con integrantes, enlace al repositorio actualizado y evidencias. También es conveniente comprobar los módulos originales de Estudiantes y Cursos.

No hay cambios en el backend ni en `docker-compose.yml`.
