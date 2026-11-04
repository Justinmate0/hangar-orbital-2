import { COMBUSTIBLE_MINIMO } from '../dominio/aptitud';

interface Props {
  // Entero de 0 a 100
  combustible: number;
}

// «Barra de combustible» de DESIGN.md §6.5. El umbral sale del dominio, nunca se escribe a mano.
export default function BarraCombustible({ combustible }: Props) {
  const bajo = combustible < COMBUSTIBLE_MINIMO;

  return (
    <div className="combustible">
      <span className="etiqueta">Combustible</span>
      <div className="combustible-fila">
        <div
          className="pista"
          role="meter"
          aria-label="Combustible"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={combustible}
        >
          {/* Único estilo en línea permitido por DESIGN.md §8: el ancho del relleno */}
          <div
            className={bajo ? 'relleno relleno--bajo' : 'relleno'}
            style={{ width: `${combustible}%` }}
          />
          {/* La marca del umbral se posiciona con un atributo del SVG, no con un estilo */}
          <svg className="umbral" aria-hidden="true" focusable="false">
            <line x1={`${COMBUSTIBLE_MINIMO}%`} x2={`${COMBUSTIBLE_MINIMO}%`} y1="0" y2="100%" />
          </svg>
        </div>
        <span className="cifra combustible-valor">{combustible} %</span>
      </div>
    </div>
  );
}
