import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import ClientesModel from "../modelsNoSQL/ClientesModel";

class ClientesController extends AbstractController {
    private static _instance: ClientesController;
    
    public static get instance(){
        if(!this._instance){
            this._instance = new ClientesController("clientes");
        }
        return this._instance;
    }

    protected initRoutes(): void {
        this.router.get('/getClientes', this.getClientes.bind(this));
        this.router.post('/addCliente', this.addCliente.bind(this));
    }

    private async getClientes(req:Request,res:Response){
        try {
            const clientes = await ClientesModel.scan().exec().promise();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({error:error});
        }
    }

    private async addCliente(req:Request,res:Response){
        try {
            const {nombre,apellido,email,telefono} = req.body;
            const cliente = await ClientesModel.create({nombre,apellido,email,telefono});
            res.status(200).send('Cliente creado correctamente')
        } catch (error) {
            res.status(500).send('Error al crear el cliente' + error);
        }
    }
}

export default ClientesController;