import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTareas } from './TareasContext.tsx';

type CrearTareaProps = {
  actualizarTareas: () => void;
};

const CrearTareaComponente: React.FC<CrearTareaProps> = ({ actualizarTareas }) => {
  const { agregarTarea } = useTareas();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(e.target.value);
  };

  const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescripcion(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Crear el objeto con los datos de la nueva tarea
    const nuevaTarea = { title: titulo, description: descripcion };

    try {
      const response = await axios.post(
        'https://7jbr0o3x3c.execute-api.us-west-2.amazonaws.com/create',
        nuevaTarea, // Enviar el objeto directamente
        {
          headers: {
            'Content-Type': 'application/json' // Asegurar que el tipo de contenido sea JSON
          }
        }
      );

      agregarTarea(response.data);
      setTitulo('');
      setDescripcion('');

      mostrarAlertaExitosa();
      actualizarTareas();
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      mostrarAlertaError();
    }
  };

  const mostrarAlertaExitosa = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Tarea agregada!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const mostrarAlertaError = () => {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'No se pudo agregar la tarea.',
    });
  };

  return (
    <div className="flex-1 p-12">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Titulo de la tarea"
          value={titulo}
          onChange={handleTituloChange}
          className="w-full bg-gray-700 text-white placeholder-gray-400 border-b border-gray-600 py-2 px-3 rounded-md focus:outline-none focus:border-blue-500 mb-2"
        />
        <textarea
          placeholder="Descripción de la tarea"
          value={descripcion}
          onChange={handleDescripcionChange}
          className="w-full h-20 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 py-2 px-3 rounded-md focus:outline-none focus:border-blue-500 mb-2"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md focus:outline-none"
        >
          Agregar Tarea
        </button>
      </form>
    </div>
  );
};

export default CrearTareaComponente;
