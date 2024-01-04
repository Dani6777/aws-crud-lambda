const AWS = require('aws-sdk');

const getTasks = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    try {
        // Simula el "SELECT * FROM table"
        const result = await dynamodb.scan({
            TableName: 'TaskTable'
        }).promise();

        const tasks = result.Items;

        return {
            statusCode: 200,
            body: JSON.stringify(tasks) // Convierte el array a una cadena JSON
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};

module.exports = {
    getTasks
};
