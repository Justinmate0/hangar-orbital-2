# Auditoría · Specs 01 y 02

- **Primera auditoría:** 2026-10-28, commit `39d0df9` del equipo anterior (spec 01).
- **Actualización:** 2026-11-04, sobre el commit `31a2c47` (spec 01 corregida y spec 02).
- **Alcance:** [docs/specs/01-flota-y-misiones.md](specs/01-flota-y-misiones.md) (HU-1.1 y HU-1.3, T-01 a T-07) y [docs/specs/02-interfaz-flota.md](specs/02-interfaz-flota.md) (HU-1.2, T-08 a T-11).

## Resumen de la actualización (2026-11-04)
- **`npm test`:** 3 archivos y 44 tests, todos en verde.
- **`npm run build`:** compila sin errores (`dist/assets/index-*.js`, 448 kB).
- **Corrección del límite:** R1 pasó a "menos de 3 misiones". Los criterios HU-1.3-CA2, CA3, CA4 y CA8 se reescribieron y sus tests se actualizaron. La observación 2 queda resuelta.
- **Spec 01 en el navegador:** Justin hizo V-01 a V-16 contra Supabase, sin fallos. Con eso pasan a "cumple" HU-1.1-CA1, CA2 y CA9, y HU-1.3-CA1. Siguen sin verificar HU-1.3-CA2 (V-17) y HU-1.3-CA7 (V-21).
- **Spec 02:** 21 criterios (HU-1.2-CA1 a CA11 y D-01 a D-10).
  - **Cumplen:** 2 (D-01 y D-02, por comando).
  - **No cumplen:** 0.
  - **Sin verificar:** 19. Las filas de navegador de [docs/VERIFICACION-UI.md](VERIFICACION-UI.md) siguen sin resultado anotado, así que no se marcan como "cumple" aunque la revisión de código no encuentre problemas.

## Resumen de la primera auditoría (2026-10-28)
- **`npm test`:** 3 archivos y 44 tests, todos en verde.
- **`npm run build`:** compila sin errores. El bundle (`dist/assets/index-*.js`, 444 kB) contiene la app completa.
- **Criterios:** 22 en total.
  - **Cumplen:** 16.
  - **No cumplen:** 0.
  - **Sin verificar:** 6.
- **Por qué quedan 6 sin verificar:** [docs/VERIFICACION.md](VERIFICACION.md) tiene vacía la columna "Resultado obtenido" en sus 21 filas, y git no registra cambios en ese archivo. Los criterios que la spec manda comprobar en el navegador no tienen evidencia, así que se marcan "sin verificar", no "cumple".

## Criterios de aceptación

| Criterio | Cómo se verificó | Resultado | Evidencia |
|---|---|---|---|
| HU-1.1-CA1 | Navegador (V-03) | Cumple | V-03 del 2026-11-04, y la fila de Aurora en Supabase. |
| HU-1.1-CA2 | Test + navegador (V-01) | Cumple | El test pasa: `nave.test.ts` › rechaza la clase "crucero" y "Carguera". V-01 del 2026-11-04: el selector solo ofrece las tres clases. |
| HU-1.1-CA3 | Test | Cumple | `aptitud.test.ts` › acepta una nave con exactamente un 25 % de combustible. |
| HU-1.1-CA4 | Test | Cumple | `aptitud.test.ts` › rechaza una nave con un 10 % de combustible. |
| HU-1.1-CA5 | Test | Cumple | `nave.test.ts` › rechaza el nombre "" y "   ". |
| HU-1.1-CA6 | Test | Cumple | `nave.test.ts` › rechaza la clase "". |
| HU-1.1-CA7 | Test | Cumple | `nave.test.ts` › rechaza una nave sin combustible. |
| HU-1.1-CA8 | Test | Cumple | `nave.test.ts` › rechaza el combustible -1, 101, 24.5 y NaN; acepta 0, 25 y 100. |
| HU-1.1-CA9 | Navegador (V-06) | Cumple | V-06 del 2026-11-04: una sola Aurora en Supabase. En el código, `navesService.crear` traduce el error `23505` al aviso, y la migración declara `nombre ... unique`. |
| HU-1.3-CA1 | Navegador (V-10) | Cumple | V-10 del 2026-11-04 (con despegue hoy en vez de mañana). |
| HU-1.3-CA2 | Navegador (V-17) | Sin verificar | Criterio corregido el 2026-11-04: con 3 misiones la nave deja de ser apta. V-17 sin resultado anotado. |
| HU-1.3-CA3 | Test | Cumple | Criterio corregido: el límite exacto aceptado es 2. `aptitud.test.ts` › acepta una nave con 2 misiones desde la última revisión. |
| HU-1.3-CA4 | Test | Cumple | Criterio corregido: se rechaza con 3. `aptitud.test.ts` › rechaza una nave con exactamente 3 misiones desde la última revisión. El mensaje es «Necesita revisión: ya tiene 3 misiones desde la última.» (`MENSAJES_MOTIVO`). |
| HU-1.3-CA5 | Test | Cumple | `aptitud.test.ts` › rechaza una nave con un 24 % de combustible. |
| HU-1.3-CA6 | Test | Cumple | `aptitud.test.ts` › acepta una nave con exactamente un 25 % de combustible. |
| HU-1.3-CA7 | Test + navegador (V-21) | Sin verificar | El test pasa: `aptitud.test.ts` › rechaza una nave en reparación aunque tenga combustible y pocas misiones. Falta V-21. |
| HU-1.3-CA8 | Test | Cumple | Criterio corregido. `aptitud.test.ts` › devuelve los dos motivos con poco combustible y 3 misiones. |
| HU-1.3-CA9 | Test | Cumple | `mision.test.ts` › rechaza una misión sin nave, sin destino, sin fecha o sin duración, y devuelve todos los errores a la vez. |
| HU-1.3-CA10 | Test | Cumple | `mision.test.ts` › acepta una fecha de despegue igual a hoy. |
| HU-1.3-CA11 | Test | Cumple | `mision.test.ts` › rechaza la fecha de despegue 2026-10-27 y 2025-12-31. |
| HU-1.3-CA12 | Test | Cumple | `mision.test.ts` › acepta una duración de 1 día. |
| HU-1.3-CA13 | Test | Cumple | `mision.test.ts` › rechaza una duración de 0, -1, 2.5 y NaN días. |

Los tests verifican las funciones del dominio (`validarNave`, `validarMision` y `puedeRecibirMision`), no la pantalla, tal como fija la tabla de verificación de la spec. Que el formulario muestre cada mensaje solo lo confirma el recorrido en el navegador.

## Otras comprobaciones de la spec

| Punto de la spec | Resultado | Evidencia |
|---|---|---|
| §1 Migración en `supabase/migraciones/001_hangar.sql` | Cumple | El SQL coincide con la spec: dos tablas, índice, RLS y cuatro políticas para `anon`. |
| §2 Tipos `Nave` y `Mision` en camelCase | Cumple | `src/types/nave.ts` y `src/types/mision.ts`. |
| §3 Funciones puras sin reloj ni Supabase | Cumple | `validarMision` recibe `hoy` como parámetro, y `src/dominio/` no importa servicios. |
| §4 Solo los servicios llaman a Supabase | Cumple | Solo `navesService.ts` y `misionesService.ts` importan `lib/supabase`. |
| §4 `misionesService.crear` vuelve a leer la nave antes de decidir | Cumple | Revisión de código: lee la nave y cuenta sus misiones antes de llamar a `puedeRecibirMision`, e inserta solo si puede. |
| AGENTS.md: nunca `any` | Cumple | 0 apariciones en `src/`. |
| AGENTS.md: sin claves en el código | Cumple | 0 coincidencias de JWT, `sk-`, `service_role` o URL de proyecto en `src/`. |
| Formato con Prettier | Cumple | `prettier --check src` no encuentra nada que formatear. |

## Observaciones
1. **Verificación en el navegador sin anotar.** Para cerrar los 6 criterios pendientes, hay que anotar los resultados en `docs/VERIFICACION.md` y repetir esta auditoría.
2. ~~**La cuarta misión se acepta.**~~ **Resuelta el 2026-11-04.** El cliente confirmó que una nave admite como máximo 3 misiones entre revisiones. Se corrigió de arriba hacia abajo: PRD (R1), épicas, criterios de HU-1.3, spec 01, tests (fallaron 4 antes del cambio de código) y `src/dominio/aptitud.ts` (`>=` en lugar de `>`). Falta la comprobación en el navegador (V-17 a V-19).
3. **El bundle contiene la URL y la clave pública.** Es lo esperado en una app de frontend: esa clave es pública por diseño. La protección real depende de las políticas RLS (ver Riesgos).
4. **Conteo de tests por archivo.** La spec 01 decía 17 tests en `nave.test.ts` y 12 en `aptitud.test.ts`; Vitest cuenta 18 y 11 (el total, 44, sí era correcto). Se corrigió la spec.

## Spec 02 · Interfaz de la flota

| Criterio | Cómo se verificó | Resultado | Evidencia |
|---|---|---|---|
| HU-1.2-CA1 | Navegador (U-04) | Sin verificar | U-04 sin resultado anotado. En el código, `TarjetaNave` muestra nombre, clase, `BarraCombustible`, `ContadorMisiones` y estado. |
| HU-1.2-CA2 | Navegador (U-05) | Sin verificar | U-05 sin resultado anotado. La insignia lleva texto «Apta» o «No apta» y va en la cabecera. |
| HU-1.2-CA3 | Navegador (U-06) | Sin verificar | U-06 sin resultado anotado. Los motivos salen de `MENSAJES_MOTIVO` y solo se pintan si `aptitud.puede` es falso. |
| HU-1.2-CA4 | Navegador (U-07) | Sin verificar | U-07 sin resultado anotado. |
| HU-1.2-CA5 | Navegador + código (U-08) | Sin verificar | Código: `ContadorMisiones` importa `MAX_MISIONES_SIN_REVISION` y dibuja esa cantidad de marcas. Falta U-08. |
| HU-1.2-CA6 | Navegador (U-09) | Sin verificar | U-09 sin resultado anotado. |
| HU-1.2-CA7 | Navegador | Sin verificar | Sin fila propia en `VERIFICACION-UI.md`: se comprueba con las tablas vacías. El texto es el de la spec 01. |
| HU-1.2-CA8 | Navegador (U-12) | Sin verificar | U-12 sin resultado anotado. |
| HU-1.2-CA9 | Navegador (U-10) | Sin verificar | U-10 sin resultado anotado. `App` sigue recargando la lista con `version` tras registrar o asignar. |
| HU-1.2-CA10 | Navegador (U-14, U-15) | Sin verificar | U-14 y U-15 sin resultado anotado. |
| HU-1.2-CA11 | Navegador (U-16 a U-18) | Sin verificar | U-16 a U-18 sin resultado anotado. |
| D-01 | Comando (U-01) | Cumple | El grep solo lista `src/styles/tokens.css` (15 líneas). |
| D-02 | Comando (U-02) | Cumple | Un solo `style={`: el ancho del relleno en `BarraCombustible.tsx`. La marca del umbral es un atributo de SVG. |
| D-03 | Navegador (U-05) | Sin verificar | U-05 sin resultado anotado. |
| D-04 | Navegador (U-06) | Sin verificar | U-06 sin resultado anotado. |
| D-05 | Navegador (U-07) | Sin verificar | Código: la barra importa `COMBUSTIBLE_MINIMO` para la marca y para el color. Falta U-07. |
| D-06 | Navegador + código (U-08) | Sin verificar | Igual que HU-1.2-CA5. |
| D-07 | Navegador, teclado (U-16) | Sin verificar | Código: `:focus-visible` con contorno de `--color-acento` en `base.css` y `formularios.css`. Falta U-16. |
| D-08 | Navegador + inspector (U-11) | Sin verificar | Código: cada campo con error recibe `aria-invalid`, `aria-describedby` y la clase `campo--error`. Falta U-11. |
| D-09 | Navegador (U-03, U-14, U-15) | Sin verificar | Código: `tablero.css` usa una columna y pasa a `360px minmax(0, 1fr)` desde 900 px. Falta comprobarlo en el navegador. |
| D-10 | Navegador (U-13) | Sin verificar | Revisión del diff de T-08 a T-11: ningún texto de la spec 01 cambió. Falta U-13. |

### Otras comprobaciones de la spec 02

| Punto | Resultado | Evidencia |
|---|---|---|
| §6 Ningún ticket toca `src/dominio/`, `src/services/`, `src/types/`, `src/lib/` ni `supabase/` | Cumple | `git diff --stat 2b933c4 31a2c47` sobre esas carpetas no muestra cambios. |
| §0.6 Los componentes nuevos no llaman a servicios | Cumple | `TarjetaNave`, `BarraCombustible` y `ContadorMisiones` no importan `services` ni `lib/supabase`. |
| DESIGN.md §8: sin Tailwind, CSS-in-JS ni librerías de componentes | Cumple | `package.json` no tiene dependencias nuevas. |
| AGENTS.md: nunca `any` | Cumple | 0 apariciones en `src/`. |
| Formato con Prettier | Cumple | `prettier --check src` no encuentra nada que formatear. |

## Riesgos conocidos

| # | Riesgo | Impacto | Estado |
|---|---|---|---|
| R-01 | Las políticas RLS permiten leer e insertar a cualquiera que tenga la clave pública, porque el MVP no tiene usuarios. | Cualquiera con la clave puede ver la flota y crear naves o misiones sin pasar por la app. En particular, puede asignar una misión a una nave no apta, porque el bloqueo de la regla R2 solo se aplica en el frontend. Eso pone en riesgo la métrica de éxito ("cero misiones asignadas a naves no aptas"). | Aceptado de forma temporal. Se resuelve cuando haya inicio de sesión (políticas para `authenticated`) y validando la aptitud en la base de datos. |
