# Estado inicial del proyecto

Informe hecho en plan mode al recibir el proyecto como ZIP, sin historial de git. Se leyeron AGENTS.md, CLAUDE.md, `.claude/settings.json`, `.claude/hooks/`, `.claude/skills/`, `docs/prd/`, `docs/backlog/`, `docs/specs/`, `docs/AUDITORIA.md`, `docs/VERIFICACION.md` y la estructura de `src/`.

## 1. Qué hace la app hoy y con qué stack
- Registra naves (nombre, clase y combustible), las lista con su aptitud y permite asignarles misiones (destino, fecha de despegue y duración). Si la nave no es apta, la asignación se rechaza con todos los motivos.
- Todo vive en una sola pantalla (`src/App.tsx`): formulario de nave, formulario de misión y tabla de la flota, sin estilos propios.
- Stack: Vite + React 19 + TypeScript, Supabase (`@supabase/supabase-js`), Vitest para tests y Prettier para formato.
- Capas: `src/types/` (tipos), `src/dominio/` (funciones puras con tests), `src/services/` (únicos que llaman a Supabase), `src/components/` (React), `supabase/migraciones/001_hangar.sql` (tablas `naves` y `misiones` con RLS para `anon`).

## 2. Qué trae el harness
- **Reglas (AGENTS.md, importado por CLAUDE.md con `@AGENTS.md`):** nombres del dominio en español, camelCase en TS y snake_case en la base, nunca `any`, los componentes no llaman a Supabase, nunca leer ni modificar `.env` ni `.env.local`, nunca claves en el código, solo clave pública en el frontend, ninguna funcionalidad sin spec en `docs/specs/`, y `npm test` y `npm run build` antes de cerrar una tarea.
- **Skill `commit` (`.claude/skills/commit/SKILL.md`):** solo se invoca a mano (`disable-model-invocation: true`). Lee `git diff --staged`, se detiene si no hay nada en staging o si ve `.env`, `.env.local` o algo que parezca una clave, escribe un mensaje Conventional Commits en español de máximo 72 caracteres y hace el commit. Nunca hace `git add` ni `git push`.
- **Hook `PostToolUse` (`.claude/settings.json` → `.claude/hooks/formatear.cjs`):** se dispara después de cada `Edit` o `Write`. Lee del stdin la ruta del archivo editado y, si es `.ts`, `.tsx`, `.js`, `.json` o `.css`, lo formatea con el Prettier instalado en el proyecto. No ejecuta nada más, no usa red y ante cualquier error sale con código 0, así que nunca bloquea.

## 3. Estado del sprint
- **Historias del sprint:** HU-1.1 (registrar una nave) y HU-1.3 (asignar una misión), las dos refinadas. HU-1.2, HU-1.4 y HU-1.5 siguen "por refinar".
- **Hechos:** T-01 (proyecto), T-02 (reglas de nave y aptitud) y T-05 (reglas de misión).
- **Pendientes:** T-03 y T-06 (código hecho, falta verificar en el navegador), T-04 y T-07 (faltan los resultados del navegador).
- **Criterios sin verificar:** 6 de 22, según `docs/AUDITORIA.md`: HU-1.1-CA1, CA2 y CA9, y HU-1.3-CA1, CA2 y CA7. La columna "Resultado obtenido" de `docs/VERIFICACION.md` está vacía en sus 21 filas.
- **Tests:** la spec y la auditoría reportan 44 tests en verde (17 de nave, 12 de aptitud y 15 de misión).

## 4. Inconsistencias
1. **Límite de misiones.** El PRD (R1) dice "3 misiones asignadas o menos" y el código lo cumple con `misionesDesdeRevision > 3`, así que una nave con 3 misiones recibe una cuarta y recién se rechaza la quinta. Pero el problema del PRD habla de naves que "encadenan más de 3 misiones sin revisión" y la decisión del cliente en la fuente del taller fue "máximo 3 entre revisiones". La observación 2 de `docs/AUDITORIA.md` deja la duda abierta: falta que el cliente confirme si una nave puede llegar a 4.
2. **Mensaje de revisión.** `MENSAJES_MOTIVO.revision_pendiente` dice "lleva más de 3 misiones", lo que solo tiene sentido con la regla actual.
3. **Tickets y archivos.** La spec 01 adelanta la migración completa y `contarDesdeRevision` a T-03, mientras el backlog los ubica en T-06. La spec lo explica, pero el backlog no se actualizó.
4. **HU-1.2.** La lista de naves ya existe en el código (`ListaNaves`) aunque la historia sigue "por refinar" y no tiene criterios propios.
5. **Cobertura de T-05.** El DoD marca como hecho el test de varios motivos, pero la combinación de validación y aptitud vive en `misionesService.crear`, que no tiene test.

## 5. Riesgos abiertos
- **R-01 (aceptado de forma temporal):** las políticas RLS dejan leer e insertar a cualquiera con la clave pública. El bloqueo de R2 solo vive en el frontend, así que alguien podría asignar una misión a una nave no apta sin pasar por la app.
- Sin decidir si "Aurora" y "aurora" cuentan como el mismo nombre.
- Sin decidir con qué reloj se define "hoy".
- La verificación en el navegador nunca se hizo: el comportamiento real contra Supabase no tiene evidencia.
- El proyecto llegó sin historial de git, así que no hay forma de saber por qué se tomaron algunas decisiones fuera de lo que dicen los documentos.
