import ComponentePrincipal from './ComponentePrincipal.tsx';
import { TareasProvider } from './TareasContext.tsx';

function App() {
  return (
    <TareasProvider>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-3xl mb-4">Gestión de Tareas</h1>
        <ComponentePrincipal />
      </div>
    </TareasProvider>
  );
}

export default App;
