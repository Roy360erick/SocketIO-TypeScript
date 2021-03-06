import express  from "express";
import { SERVER_PORT } from "../global/environment";
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server{
    private static _instance : Server;

    public app: express.Application;
    public port : number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app)
        this.io = socketIO(this.httpServer);
        this.escuchaSockets();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    private escuchaSockets(){
        console.log('Escuchando conexiones')
        this.io.on('connection',cliente=>{
            console.log(cliente.id);

            socket.conectarCliente(cliente);

            
             //configurar usuario 
             socket.configurarUsuario(cliente,this.io);

            //Mensajes
            socket.mensaje(cliente,this.io);
            //Desconectar 
            socket.desconectar(cliente);

           


        })
    }

    start( callback:VoidFunction ){
        this.httpServer.listen(this.port, callback);
    }

}