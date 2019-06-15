import { Router, Request, Response } from "express";
import Server from "../models/server";

 const router = Router();

router.post('/mensajes',(req: Request, res: Response)=>{
    const server = Server.instance;

    server.io.emit('mensaje-nuevo',{cuerpo:'todo esta bien',de:'Servidor web'});
    res.json({
        ok:true, 
        mensaje:'todo esta bien'
    });
})

router.post('/mensajes/:id',(req: Request, res: Response)=>{
    const cuerpo = req.body.cuerpo;
    const id = req.params.id
    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado',{mensaje:'todo esta bien'});

    res.json({
        ok:true, 
        mensaje:'todo esta bien'
    });
})

export default router;