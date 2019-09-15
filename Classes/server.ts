import express from 'express';
import { SERVER_PORT } from '../globals/environments';
import http from 'http';
import socketIO from 'socket.io';

import * as sockets from '../sockets/sockets';

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;
    
    private constructor() {
        // Iniciar express
        this.app = express();
        // Obtenemos el puerto desde las environments(entorno)
        this.port = SERVER_PORT;
        // creamos un servidor http con funcionalidad de express
        this.httpServer = http.createServer(this.app);
        // Iniciar socketIo
        this.io = socketIO(this.httpServer);

        this.escucharSockets();
    }

    // Solo se puede instanciar una vez esta clase.
    public static get instance():Server {
        return this._instance || (this._instance = new this());
    }



    start(callback: ()=>void) {
        this.httpServer.listen(this.port, callback);
    }

    private escucharSockets() {
        //Escuchar conecciones
        this.io.on('connection', socket => {
            console.log('Nuevo cliente conectado');
            // Escuchar nuevos mensajes
            sockets.newMessage(socket, this.io);

            // Escuchar desconeccion
            sockets.desconectar(socket);
        });
    }
}