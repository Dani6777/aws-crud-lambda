const addTask = require('../../src/addTask.js')
const eventGenerator = require('../testUtils/eventGenerator');
const validators = require('../testUtils/validators');

describe('create task integration test', () => {
    test('it should take a body and return an API Gateway response', async () => {
        // Genera un evento de prueba con un cuerpo válido.
        const event = eventGenerator({
            body: {
                title: 'title',
                description: 'description'
            },
        });

        try {
           
            const res = await addTask(event);

            // Agrega declaraciones de consola para depurar si es necesario.
            console.log('Response:', res);

            expect(res).toBeDefined();

            expect(validators.isApiGatewayResponse(res)).toBe(true);
        } catch (error) {
            // Maneja errores si ocurren durante la ejecución de la prueba.
            console.error('Error during test:', error);
            throw error; // Propaga el error para que Jest lo detecte.
        }
    });
});
