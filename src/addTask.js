const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addTask = async (event) => {
    // Intenta conectarse a la bd de DynamoDB de AWS
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    // Objeto de conexión a la bd
    const { title, description } = JSON.parse(event.body);
    const createdAt = new Date();
    const id = v4();

    const newTask = {
        id,
        title,
        description,
        createdAt
    };

    // Guardamos los datos en DynamoDB
    await dynamodb.put({
        TableName: 'TaskTable',
        Item: newTask
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newTask)
    };
};

module.exports = {
    addTask
};
