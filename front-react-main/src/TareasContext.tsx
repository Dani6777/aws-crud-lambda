import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type Tarea = {
  titulo: string;
  descripcion: string;
};

type TareasContextType = {
  tareas: Tarea[];
  agregarTarea: (nuevaTarea: Tarea) => void;
  editarTarea: (indice: number, tareaEditada: Tarea) => void;
  eliminarTarea: (indice: number) => void;
  setTareas: Dispatch<SetStateAction<Tarea[]>>;
};

const TareasContext = createContext<TareasContextType | undefined>(undefined);

type TareasProviderProps = {
  children: ReactNode;
};

export const TareasProvider: React.FC<TareasProviderProps> = ({ children }) => {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  const agregarTarea = (nuevaTarea: Tarea) => {
    setTareas([...tareas, nuevaTarea]);
  };

  const editarTarea = (indice: number, tareaEditada: Tarea) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[indice] = tareaEditada;
    setTareas(nuevasTareas);
  };

  const eliminarTarea = (indice: number) => {
    const nuevasTareas = tareas.filter((_, index) => index !== indice);
    setTareas(nuevasTareas);
  };

  return (
    <TareasContext.Provider value={{ tareas, agregarTarea, editarTarea, eliminarTarea, setTareas }}>
      {children}
    </TareasContext.Provider>
  );
};

export const useTareas = () => {
  const context = useContext(TareasContext);
  if (!context) {
    throw new Error('useTareas debe ser usado dentro de un TareasProvider');
  }
  return context;
};
