import dynamodb from "../services/dynamoService";
import joi from 'joi';
import {PREFIX_NAME} from '../config';

const ClientesModel = dynamodb.define(`${PREFIX_NAME}-clientes`,{
    hashKey: 'id',
    timestamps: false,
    schema: {
        id: dynamodb.types.uuid(),
        nombre: joi.string(),
        apellido: joi.string(),
        email: joi.string().email(),
        telefono: joi.string(),
    },
    tableName: `${PREFIX_NAME}-clientes`
});

dynamodb.createTables((err: any) => {
    if (err) {
        console.log("Error creating tables", err);
    } else {
        console.log("Tables has been created");
    }
});

export default ClientesModel;