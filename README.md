# Nombre del Proyecto

Este proyecto es una aplicación web que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre un conjunto de datos. La aplicación consta de un Front End desarrollado con React JS y TypeScript, gestionando el estado mediante React Context, y un Back End implementado en Node JS utilizando Serverless Framework, con una base de datos DynamoDB para almacenar la información. Además, se incluye la integración de tecnologías deseadas, en este caso, Serverless en AWS, y pruebas unitarias con Jest.js.

## Tecnologías Utilizadas

- AWS
- Serverless Framework
- React

## Configuración del Proyecto

### Backend (Serverless Framework)

1. **Instalar dependencias:**

   ```bash
   cd backend
   npm install

   ```
   
Configurar las credenciales de AWS:

 ```bash
serverless config credentials --provider aws --key TU_ACCESS_KEY --secret TU_SECRET_KEY
```
 ```bash
Despliegue del servicio:
serverless deploy
```

Frontend (React)
Instalar dependencias:

 ```bash
cd frontend-react-main
npm install
Configurar variables de entorno en el archivo .env:
```
 ```bash
REACT_APP_API_URL=https://url-del-backend
```
Iniciar la aplicación:
 ```bash
npm run dev(para el frontend)
Estructura del Proyecto
src/: Contiene el código del backend construido con Serverless Framework.
frontend-react-main/: Contiene el código del frontend construido con React.
```
Contribuciones
Si quieres contribuir al proyecto, sigue los pasos a continuación:

Crea un fork del repositorio.
Crea una rama para tu nueva característica (git checkout -b nueva-caracteristica).
Realiza tus cambios y haz commit (git commit -m 'Añadir nueva característica').
Haz push a la rama (git push origin nueva-caracteristica).
Crea un nuevo Pull Request.
Problemas Conocidos
Lista de problemas conocidos y posibles soluciones.

Licencia
Este proyecto está bajo la Licencia MIT.
