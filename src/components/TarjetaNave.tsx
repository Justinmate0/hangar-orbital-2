import { MENSAJES_MOTIVO } from '../dominio/aptitud';
import type { Aptitud } from '../types/mision';
import type { Nave } from '../types/nave';
import BarraCombustible from './BarraCombustible';
import ContadorMisiones from './ContadorMisiones';

interface Props {
  nave: Nave;
  misiones: number;
  aptitud: Aptitud;
}

// «Tarjeta de nave» de DESIGN.md §6.7, en su orden fijo. Solo presenta: no calcula la aptitud.
export default function TarjetaNave({ nave, misiones, aptitud }: Props) {
  return (
    <article className="tarjeta-nave">
      <header className="tarjeta-cabecera">
        <h3>{nave.nombre}</h3>
        {aptitud.puede ? (
          <span className="insignia insignia--apta">Apta</span>
        ) : (
          <span className="insignia insignia--no-apta">No apta</span>
        )}
      </header>

      <p className="clase">{nave.clase}</p>

      <BarraCombustible combustible={nave.combustible} />

      <ContadorMisiones misiones={misiones} />

      <div className="tarjeta-estado">
        {nave.enReparacion ? (
          <span className="insignia insignia--reparacion">En reparación</span>
        ) : (
          <span className="suave">Operativa</span>
        )}
      </div>

      {!aptitud.puede && (
        <ul className="motivos">
          {aptitud.motivos.map((motivo) => (
            <li key={motivo}>{MENSAJES_MOTIVO[motivo]}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
