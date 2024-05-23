import Server from './provider/Server';
import {PORT,NODE_ENV} from './config';
import express from 'express';
import VideojuegosController from'./controllers/VideojuegoController'
import ClientesController from './controllers/ClientesController';

const server = new Server({
    port:PORT,
    env:NODE_ENV,
    middlewares:[
        express.json(),
        express.urlencoded({extended:true})
    ],
    controllers:[
        VideojuegosController.instance,
        ClientesController.instance
    ]
});

server.init();