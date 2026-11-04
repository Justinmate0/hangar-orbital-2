import { useState } from 'react';
import FormularioMision from './components/FormularioMision';
import FormularioNave from './components/FormularioNave';
import ListaNaves from './components/ListaNaves';

export default function App() {
  // Se incrementa para que la lista y el selector de naves vuelvan a cargar tras un cambio
  const [version, setVersion] = useState(0);
  const recargar = () => setVersion((v) => v + 1);

  return (
    <div className="contenedor">
      <header className="encabezado">
        <h1>Hangar Orbital</h1>
        <p className="suave">Control de despegues</p>
      </header>

      <main className="tablero">
        <div className="columna-formularios">
          <section className="panel" aria-labelledby="titulo-registrar">
            <h2 id="titulo-registrar">Registrar nave</h2>
            <FormularioNave onRegistrada={recargar} />
          </section>

          <section className="panel" aria-labelledby="titulo-asignar">
            <h2 id="titulo-asignar">Asignar misión</h2>
            <FormularioMision version={version} onAsignada={recargar} />
          </section>
        </div>

        <section className="seccion-flota" aria-labelledby="titulo-flota">
          <h2 id="titulo-flota">Flota</h2>
          <ListaNaves version={version} />
        </section>
      </main>
    </div>
  );
}
