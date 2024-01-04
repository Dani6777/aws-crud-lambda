import React, { useState } from 'react';
import CrearTareaComponente from './CrearTareaComponente.tsx';
import ListadoTareasComponente from './ListadoTareasComponente.tsx';

const ComponentePrincipal: React.FC = () => {
  const [actualizarTareas, setActualizarTareas] = useState(false);

  const toggleActualizarTareas = () => {
    setActualizarTareas((prevState) => !prevState);
  };

  return (
    <div className="flex">
      <CrearTareaComponente actualizarTareas={toggleActualizarTareas} />
      <ListadoTareasComponente actualizarTareas={actualizarTareas} />
    </div>
  );
};

export default ComponentePrincipal;
