import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

type ListadoTareasProps = {
  actualizarTareas: boolean;
};

const ListadoTareasComponente: React.FC<ListadoTareasProps> = ({ actualizarTareas }) => {
  const [tareas, setTareas] = useState<any[]>([]);
  const [tareaEditando, setTareaEditando] = useState<any>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editTitulo, setEditTitulo] = useState('');
  const [editDescripcion, setEditDescripcion] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(3); // Número de tareas por página

  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const response = await axios.get(
          'https://7jbr0o3x3c.execute-api.us-west-2.amazonaws.com/tasks'
        );
        setTareas(response.data);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };

    obtenerTareas();
  }, [actualizarTareas]);

  const handleEliminarTarea = async (id: string) => {
    try {
      await axios.delete(`https://7jbr0o3x3c.execute-api.us-west-2.amazonaws.com/task/${id}`);
      setTareas(tareas.filter((tarea: any) => tarea.id !== id));
      mostrarAlertaExitosa('Tarea eliminada');
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      mostrarAlertaError('Error al eliminar la tarea');
    }
  };

  const abrirModalEditar = (tarea: any) => {
    setTareaEditando(tarea);
    setEditTitulo(tarea.title);
    setEditDescripcion(tarea.description);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setTareaEditando(null);
    setEditTitulo('');
    setEditDescripcion('');
    setModalAbierto(false);
  };

  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitulo(e.target.value);
  };

  const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditDescripcion(e.target.value);
  };

  const handleEditarTarea = async () => {
    try {
      const updatedTarea = {
        ...tareaEditando,
        title: editTitulo,
        description: editDescripcion,
      };
      await axios.put(
        `https://7jbr0o3x3c.execute-api.us-west-2.amazonaws.com/task/${tareaEditando.id}`,
        updatedTarea
      );

      // Actualizar la lista de tareas después de la edición
      const updatedTareas = tareas.map((tarea: any) =>
        tarea.id === tareaEditando.id ? updatedTarea : tarea
      );
      setTareas(updatedTareas);
      cerrarModal();
      mostrarAlertaExitosa('Tarea editada');
    } catch (error) {
      console.error('Error al editar la tarea:', error);
      mostrarAlertaError('Error al editar la tarea');
    }
  };

  const mostrarAlertaExitosa = (mensaje: string) => {
    Swal.fire({
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const mostrarAlertaError = (mensaje: string) => {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: mensaje,
    });
  };

  // Lógica para la paginación
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tareas.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>

  <ul className="flex-1 p-4 space-y-4">
    {currentTasks.map((tarea: any) => (
      <li
        key={tarea.id}
        className="bg-gray-800 rounded-md p-4 hover:bg-gray-700 transition duration-300 relative"
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white">{tarea.title}</h3>
            <p className="text-gray-300">{tarea.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleEliminarTarea(tarea.id)}
              className="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            >
              Eliminar
            </button>
            <button
              onClick={() => abrirModalEditar(tarea)}
              className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Editar
            </button>
          </div>
        </div>
      </li>
    ))}

    {tareas.length > tasksPerPage && (
      <ul className="flex justify-center items-center space-x-2 py-4">
        {Array(Math.ceil(tareas.length / tasksPerPage))
          .fill(0)
          .map((_, index) => (
            <li
              key={index}
              onClick={() => paginate(index + 1)}
              className="bg-gray-800 text-white rounded-full h-8 w-8 flex items-center justify-center cursor-pointer transition duration-300 hover:bg-gray-700"
            >
              {index + 1}
            </li>
          ))}
      </ul>
    )}
  </ul>
      {modalAbierto && tareaEditando && (
        <div
          className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          onClick={cerrarModal}
        >
          <div
            className="bg-gray-800 p-4 rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-white mb-4">Editar Tarea</h2>
            <form className="text-white">
              <label className="block mb-2">
                Título:
                <input
                  type="text"
                  className="border rounded-md w-full mt-1 bg-gray-700 text-white placeholder-gray-400 py-1 px-3 focus:outline-none focus:border-blue-500"
                  value={editTitulo}
                  onChange={handleTituloChange}
                />
              </label>
              <label className="block mb-2">
                Descripción:
                <textarea
                  className="border rounded-md w-full mt-1 bg-gray-700 text-white placeholder-gray-400 py-1 px-3 focus:outline-none focus:border-blue-500"
                  value={editDescripcion}
                  onChange={handleDescripcionChange}
                ></textarea>
              </label>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleEditarTarea}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md mr-2"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ListadoTareasComponente;
