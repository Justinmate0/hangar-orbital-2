# Spec 02 · Interfaz de la flota

- **Historias:** HU-1.2 (consultar la flota) y la interfaz de los formularios que ya existen (HU-1.1 y HU-1.3).
- **Origen:** [docs/backlog/E1-flota-y-misiones.md](../backlog/E1-flota-y-misiones.md), [DESIGN.md](../../DESIGN.md) y [docs/specs/01-flota-y-misiones.md](01-flota-y-misiones.md).
- **Tickets:** T-08 a T-11.

## 0. Decisiones de esta spec
1. **Es una spec visual.** No cambia reglas, servicios ni la base de datos. Los cálculos siguen en `src/dominio/` y las llamadas a Supabase en `src/services/`.
2. **Los textos no cambian.** Todo texto visible es el de la spec 01. Las únicas palabras nuevas son el subtítulo «Control de despegues», que pide DESIGN.md §5, y las etiquetas de dato de la tarjeta («Combustible» y «Misiones desde la última revisión»), que ya eran los encabezados de la tabla.
3. **La flota pasa de tabla a tarjetas.** Así lo decide DESIGN.md §3: cada nave es una unidad con su aptitud arriba a la derecha.
4. **Los umbrales salen del dominio.** La barra y el contador importan `COMBUSTIBLE_MINIMO` y `MAX_MISIONES_SIN_REVISION` de `src/dominio/aptitud.ts`. Si la regla cambia, la interfaz cambia sola.
5. **Un solo estilo en línea.** El ancho del relleno de la barra de combustible es el único `style={…}`, como permite DESIGN.md §8. La marca del umbral se dibuja con un SVG cuya posición es un atributo, no un estilo.
6. **Los componentes nuevos son de presentación.** Reciben datos por props, no llaman a servicios y no calculan la aptitud.

## 1. Componentes de DESIGN.md por parte de la pantalla
Los componentes se citan por su nombre en DESIGN.md §6. Los valores viven allí y en `tokens.css`, no en esta spec.

| Parte de la pantalla | Componentes de DESIGN.md | Archivo de React |
|---|---|---|
| Encabezado («Hangar Orbital» y «Control de despegues») | Layout §5 (encabezado) | `src/App.tsx` |
| Tablero | Layout §5 (dos columnas desde 900 px, una por debajo) | `src/App.tsx` |
| «Registrar nave» | Panel, Campo de formulario, Botón primario, Avisos | `src/components/FormularioNave.tsx` |
| «Asignar misión» | Panel, Campo de formulario, Botón primario, Avisos (el rechazo por nave no apta es un aviso de error) | `src/components/FormularioMision.tsx` |
| «Flota» | Tarjeta de nave en una lista, Estados de la flota | `src/components/ListaNaves.tsx` |
| Cabecera de cada tarjeta | Insignia de estado (`insignia--apta` o `insignia--no-apta`) | `src/components/TarjetaNave.tsx` |
| Combustible de cada nave | Barra de combustible | `src/components/BarraCombustible.tsx` |
| Misiones de cada nave | Contador de misiones | `src/components/ContadorMisiones.tsx` |
| Estado de cada nave | Texto suave «Operativa» o Insignia de estado (`insignia--reparacion`) | `src/components/TarjetaNave.tsx` |

Props de los componentes nuevos:

```ts
// src/components/TarjetaNave.tsx
interface TarjetaNaveProps {
  nave: Nave;
  misiones: number;
  aptitud: Aptitud;
}

// src/components/BarraCombustible.tsx
interface BarraCombustibleProps {
  combustible: number; // 0 a 100
}

// src/components/ContadorMisiones.tsx
interface ContadorMisionesProps {
  misiones: number;
}
```

`ListaNaves` sigue siendo el único que llama a los servicios y a `puedeRecibirMision`. Pasa a `TarjetaNave` lo que ya calculaba.

## 2. Archivos de `src/styles/` y cómo se importan

| Archivo | Contenido | Ticket |
|---|---|---|
| `tokens.css` | Todos los tokens de DESIGN.md §4 dentro de `:root`. Es el único archivo con colores hexadecimales. | T-08 |
| `base.css` | Caja, fondo, tipografía, títulos, foco visible, utilidades de cifras y `prefers-reduced-motion`. | T-08 |
| `tarjeta-nave.css` | Tarjeta de nave, Insignia de estado, Barra de combustible, Contador de misiones y Estados de la flota. | T-09 |
| `formularios.css` | Campo de formulario, Botón y Avisos. | T-10 |
| `tablero.css` | Encabezado, Panel y layout del tablero. | T-11 |

Se importan todos desde `src/main.tsx`, en este orden, antes de montar `App`:

```ts
import './styles/tokens.css';
import './styles/base.css';
import './styles/tarjeta-nave.css';
import './styles/formularios.css';
import './styles/tablero.css';
```

Las fuentes IBM Plex Sans, IBM Plex Sans Condensed e IBM Plex Mono se cargan en `index.html` desde Google Fonts, con `display=swap`. Sin conexión se usan las de respaldo que fija `tokens.css`.

## 3. Criterios

### HU-1.2 · Consultar la flota
- **HU-1.2-CA1:** por cada nave registrada, la flota DEBE mostrar una tarjeta con nombre, clase, combustible en %, misiones desde la última revisión y «Operativa» o «En reparación».
- **HU-1.2-CA2:** cada tarjeta DEBE mostrar la aptitud con el texto «Apta» o «No apta», siempre en la misma posición (cabecera, a la derecha). La aptitud NO DEBE comunicarse solo con color.
- **HU-1.2-CA3:** la tarjeta de una nave no apta DEBE listar todos sus motivos, con los textos de `MENSAJES_MOTIVO`. Una nave apta NO DEBE mostrar lista de motivos.
- **HU-1.2-CA4:** la tarjeta DEBE mostrar el combustible como cifra y como barra con la marca del mínimo, y la barra DEBE distinguirse cuando el combustible está por debajo del mínimo.
- **HU-1.2-CA5:** la tarjeta DEBE mostrar las misiones como «n de M», donde M es `MAX_MISIONES_SIN_REVISION`, con M marcas, de las cuales n están ocupadas.
- **HU-1.2-CA6:** una nave en reparación DEBE mostrar «En reparación» como insignia; una operativa DEBE mostrar «Operativa» como texto, sin insignia.
- **HU-1.2-CA7:** sin naves, la flota DEBE mostrar «Todavía no hay naves registradas.».
- **HU-1.2-CA8:** si la flota no carga, la app DEBE mostrar «No se pudo cargar la flota.» como aviso de error.
- **HU-1.2-CA9:** tras registrar una nave o asignar una misión, la flota DEBE actualizarse sin recargar la página.
- **HU-1.2-CA10:** a 390 px de ancho la app DEBE verse en una sola columna y NO DEBE tener scroll horizontal.
- **HU-1.2-CA11:** la app DEBE poder usarse solo con teclado, y todo control DEBE mostrar el foco.

### Criterios de DESIGN.md que aplican
Aplican los diez, D-01 a D-10 (DESIGN.md §9):

| # | Criterio |
|---|---|
| D-01 | Ningún archivo de `src/` fuera de `tokens.css` contiene un color hexadecimal. |
| D-02 | No hay estilos en línea, salvo el ancho de la barra de combustible. |
| D-03 | Cada nave muestra su aptitud con insignia y texto, en la esquina superior derecha de su tarjeta. |
| D-04 | Una nave no apta muestra sus motivos con los textos de `MENSAJES_MOTIVO`. |
| D-05 | La barra marca el umbral y se pinta en rojo por debajo de él. |
| D-06 | El contador muestra «n de 3» y tantas marcas como el máximo del dominio. |
| D-07 | Al recorrer la app con Tab, todo control muestra el foco en cian. |
| D-08 | Un campo con error tiene borde rojo, mensaje debajo y `aria-invalid="true"`. |
| D-09 | A 1280 px el tablero tiene dos columnas; a 390 px, una, sin scroll horizontal. |
| D-10 | Los textos visibles coinciden con los de la spec 01. |

Además:
- Los componentes nuevos NO DEBEN importar servicios ni `src/lib/supabase.ts`.
- `npm test` DEBE seguir pasando con los 44 tests, y `npm run build` DEBE compilar.

## 4. Verificación por criterio

| Criterio | Verificación | Qué se comprueba |
|---|---|---|
| HU-1.2-CA1 | Navegador | Registrar Aurora y verla como tarjeta con sus cinco datos. |
| HU-1.2-CA2 | Navegador | Con una nave apta y una no apta, la insignia está en la cabecera a la derecha y dice «Apta» o «No apta». |
| HU-1.2-CA3 | Navegador | Ceniza (10 %) lista «Combustible insuficiente: necesita al menos un 25 %.»; Aurora no lista motivos. |
| HU-1.2-CA4 | Navegador | Ceniza (10 %) tiene el relleno en rojo a la izquierda de la marca; Duna (25 %) lo tiene en verde, justo en la marca. |
| HU-1.2-CA5 | Navegador + revisión de código | Aurora con 1 misión muestra «1 de 3» y una de tres marcas ocupada; `ContadorMisiones` importa `MAX_MISIONES_SIN_REVISION`. |
| HU-1.2-CA6 | Navegador | Con `en_reparacion = true` desde el panel de Supabase, la tarjeta muestra la insignia «En reparación». |
| HU-1.2-CA7 | Navegador | Con las tablas vacías aparece el estado vacío. |
| HU-1.2-CA8 | Navegador | Con la red desconectada (DevTools → Network → Offline) y recargando, aparece el aviso de error. |
| HU-1.2-CA9 | Navegador | Al asignar una misión, el contador de la tarjeta sube sin recargar. |
| HU-1.2-CA10 | Navegador (modo responsive, 390 px) | Una columna y sin scroll horizontal. |
| HU-1.2-CA11 | Navegador, solo teclado | Registrar una nave y asignar una misión usando Tab, Enter y las flechas del selector. |
| D-01 | Comando | `grep -rnE "#[0-9a-fA-F]{3,8}\b" src --include=*.css --include=*.tsx` solo lista `src/styles/tokens.css`. |
| D-02 | Comando | `grep -rn "style={" src` solo lista el relleno de `BarraCombustible.tsx`. |
| D-03 | Navegador | Insignia en la esquina superior derecha de cada tarjeta. |
| D-04 | Navegador | Igual que HU-1.2-CA3. |
| D-05 | Navegador | Igual que HU-1.2-CA4. |
| D-06 | Navegador + revisión de código | Igual que HU-1.2-CA5. |
| D-07 | Navegador, solo teclado | Cada campo, selector y botón muestra un contorno cian al recibir el foco. |
| D-08 | Navegador + inspector | Enviar el formulario vacío: cada campo con error tiene borde rojo, el mensaje debajo y `aria-invalid="true"`. |
| D-09 | Navegador (modo responsive) | A 1280 px, dos columnas; a 390 px, una, sin scroll horizontal. |
| D-10 | Navegador | Repetir los textos esperados de `docs/VERIFICACION.md` y comprobar que no cambió ninguno. |

## 5. Tickets

| Ticket | Tipo | Definition of Done (resumen) | Depende de |
|---|---|---|---|
| T-08 · Tokens, base y fuentes | Interfaz/Estilos | Tokens completos en `tokens.css`; base con fondo, fuentes y foco; D-01; textos sin cambios; tests y build en verde. | Esta spec |
| T-09 · Tarjeta de nave | Interfaz | Tarjetas en `ul`/`li` con el orden de DESIGN.md §6.7; D-02 a D-06; barra con `role="meter"`; tests y build en verde. | T-08 |
| T-10 · Formularios y avisos | Interfaz | D-07 y D-08; avisos con `role` correcto bajo su botón; mensajes de la spec 01 sin cambios; tests y build en verde. | T-08 |
| T-11 · Layout del tablero | Interfaz | Encabezado y tablero de DESIGN.md §5; D-09; orden de Tab correcto; tests y build en verde. | T-08, T-09, T-10 |

El detalle de cada Definition of Done está en el backlog.

## 6. Tickets y archivos
Ningún ticket toca `src/dominio/`, `src/services/`, `src/types/`, `src/lib/` ni `supabase/`.

| Ticket | Crea | Modifica |
|---|---|---|
| T-08 | `src/styles/tokens.css`, `src/styles/base.css` | `index.html` (fuentes), `src/main.tsx` (imports) |
| T-09 | `src/components/TarjetaNave.tsx`, `src/components/BarraCombustible.tsx`, `src/components/ContadorMisiones.tsx`, `src/styles/tarjeta-nave.css` | `src/components/ListaNaves.tsx`, `src/main.tsx` (import) |
| T-10 | `src/styles/formularios.css` | `src/components/FormularioNave.tsx`, `src/components/FormularioMision.tsx`, `src/main.tsx` (import) |
| T-11 | `src/styles/tablero.css` | `src/App.tsx`, `src/main.tsx` (import) |

## Pendientes
1. **Fuentes sin conexión:** si no hay acceso a Google Fonts se usan las de respaldo. No cuenta como fallo.
2. **Flota grande:** no hay búsqueda ni filtro; queda para E2.
