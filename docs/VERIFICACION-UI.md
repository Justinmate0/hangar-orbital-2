# Verificación de la interfaz · Spec 02

Esta guía verifica [docs/specs/02-interfaz-flota.md](specs/02-interfaz-flota.md) (HU-1.2 y los criterios D-01 a D-10 de [DESIGN.md](../DESIGN.md)) en la app real, contra Supabase.

## Antes de empezar
1. `npm run dev` está corriendo y la app está abierta en la URL que indica la terminal.
2. En la flota están las naves de `docs/VERIFICACION.md`: Aurora (80 %), Ceniza (10 %) y Duna (25 %). Si no, regístralas.
3. Abre las herramientas de desarrollo con **F12**. Para cambiar el ancho, usa el modo responsive (**Ctrl + Shift + M**) y escribe el ancho a mano.

Trabajen en parejas: uno opera la app y el otro llena la columna "Resultado obtenido".

## Comandos (los ejecutó el agente)

| # | Criterio | Pasos | Resultado esperado | Resultado obtenido |
|---|---|---|---|---|
| U-01 | D-01 | En la raíz del proyecto: `grep -rnE "#[0-9a-fA-F]{3,8}\b" src --include=*.css --include=*.tsx` | Solo aparecen líneas de `src/styles/tokens.css`. | **Cumple** (2026-11-04): 15 líneas, todas de `src/styles/tokens.css`. |
| U-02 | D-02 | En la raíz del proyecto: `grep -rn "style={" src` | Solo aparece el ancho del relleno de la barra de combustible. | **Cumple** (2026-11-04): una sola línea, `src/components/BarraCombustible.tsx:27`, `style={{ width: \`${combustible}%\` }}`. |

## Navegador a 1280 px

| # | Criterio | Pasos | Resultado esperado | Resultado obtenido |
|---|---|---|---|---|
| U-03 | D-09 | Poner el ancho en 1280 px y recargar. | Formularios a la izquierda y flota a la derecha: dos columnas. | |
| U-04 | HU-1.2-CA1 | Mirar la tarjeta de Aurora. | Nombre, clase, barra de combustible con «80 %», contador de misiones y «Operativa». | |
| U-05 | D-03, HU-1.2-CA2 | Mirar la cabecera de cada tarjeta. | La insignia está arriba a la derecha y dice «Apta» o «No apta». | |
| U-06 | D-04, HU-1.2-CA3 | Mirar la tarjeta de Ceniza. | Lista «Combustible insuficiente: necesita al menos un 25 %.». Aurora no lista motivos. | |
| U-07 | D-05, HU-1.2-CA4 | Comparar la barra de Ceniza (10 %) con la de Duna (25 %). | Las dos tienen la marca del umbral. Ceniza tiene el relleno rojo a la izquierda de la marca; Duna, verde y justo en la marca. | |
| U-08 | D-06, HU-1.2-CA5 | Mirar el contador de Aurora (con las 3 misiones de `VERIFICACION.md`). | Dice «3 de 3», con tres marcas ocupadas, y la tarjeta dice «No apta» con «Necesita revisión: ya tiene 3 misiones desde la última.». | |
| U-09 | HU-1.2-CA6 | En el panel de Supabase, poner `en_reparacion = true` en una nave y recargar. | Esa tarjeta muestra la insignia «En reparación»; las demás dicen «Operativa» como texto. | |
| U-10 | HU-1.2-CA9 | Asignar una misión válida a una nave apta. | El contador de su tarjeta sube en 1 sin recargar la página. | |
| U-11 | D-08 | Pulsar «Registrar nave» con el formulario vacío. Con F12, inspeccionar el campo «Nombre». | Los tres campos tienen borde rojo y su mensaje debajo. El `input` tiene `aria-invalid="true"`. | |
| U-12 | HU-1.2-CA8 | En F12 → Network, elegir **Offline** y recargar. Después volver a **No throttling**. | Aparece el aviso «No se pudo cargar la flota.». | |
| U-13 | D-10 | Repetir V-02, V-03, V-07, V-11 y V-18 de `docs/VERIFICACION.md`. | Los textos coinciden carácter por carácter con los de la spec 01. | |

## Navegador a 390 px

| # | Criterio | Pasos | Resultado esperado | Resultado obtenido |
|---|---|---|---|---|
| U-14 | D-09, HU-1.2-CA10 | Poner el ancho en 390 px y recargar. Bajar hasta el final. | Una sola columna, en este orden: encabezado, registrar nave, asignar misión y flota. | |
| U-15 | D-09, HU-1.2-CA10 | A 390 px, intentar desplazar la página hacia los lados. | No hay scroll horizontal y ningún texto se sale de su tarjeta. | |

## Solo teclado

| # | Criterio | Pasos | Resultado esperado | Resultado obtenido |
|---|---|---|---|---|
| U-16 | D-07 | Hacer clic en la barra de direcciones y pulsar Tab hasta recorrer toda la app. | Cada campo, selector y botón muestra un contorno cian al recibir el foco. | |
| U-17 | HU-1.2-CA11 | Sin tocar el mouse, registrar Estela (transporte, 50 %) con Tab, las flechas y Enter. | La nave se registra y aparece en la flota. | |
| U-18 | HU-1.2-CA11 | Sin tocar el mouse, asignar a Estela una misión a Titán, despegue mañana, 2 días. | La misión se asigna y el contador de Estela pasa a «1 de 3». | |

## Cierre
- [ ] Todas las filas tienen anotado su resultado obtenido.
- [ ] Las filas que fallan tienen anotado lo que se vio y se corrigieron con el prompt de corrección del paso 7.
