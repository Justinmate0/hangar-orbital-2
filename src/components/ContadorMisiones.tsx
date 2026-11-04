import { MAX_MISIONES_SIN_REVISION } from '../dominio/aptitud';

interface Props {
  // Misiones asignadas desde la última revisión
  misiones: number;
}

// «Contador de misiones» de DESIGN.md §6.6. El máximo sale del dominio, nunca se escribe a mano.
export default function ContadorMisiones({ misiones }: Props) {
  const marcas = Array.from({ length: MAX_MISIONES_SIN_REVISION }, (_, i) => i < misiones);

  return (
    <div className="contador">
      <span className="etiqueta">Misiones desde la última revisión</span>
      <div className="contador-valor">
        <span className="marcas" aria-hidden="true">
          {marcas.map((ocupada, i) => (
            <span key={i} className={ocupada ? 'marca marca--ocupada' : 'marca'} />
          ))}
        </span>
        <span className="cifra">
          {misiones} de {MAX_MISIONES_SIN_REVISION}
        </span>
      </div>
    </div>
  );
}
