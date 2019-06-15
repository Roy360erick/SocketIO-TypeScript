import { Socket } from "socket.io";
import { UsuarioLista } from "../models/usuario-lista";
import { Usuario } from "../models/usuario";

export const usuariosConectados = new UsuarioLista();

export const conectarCliente =(cliente: Socket)=>{
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario)
}

export const desconectar = (cliente: Socket)=>{
    cliente.on('disconnect',()=>{
        console.log('Cliente Desconectado');
        usuariosConectados.borrarUsuario(cliente.id)
    })
}

//Escuchar mensajes
export const mensaje = (cliente:Socket, io: SocketIO.Server)=>{
    cliente.on('mensaje',(payload:{de : string , cuerpo: string})=> {
        console.log("mensaje recibido ", payload);

        io.emit('mensaje-nuevo',payload);
    });
}

//Configurar usaurio
export const configurarUsuario = (cliente:Socket, io: SocketIO.Server)=>{
    cliente.on('configurar-usuario',(payload:{nombre : string},callback:Function)=> {
        usuariosConectados.actualizarNombre(cliente.id,payload.nombre);
        console.log("configurando usuario", payload);
        callback({ok:true})
    });
}
