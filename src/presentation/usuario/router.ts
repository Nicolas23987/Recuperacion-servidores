import { Router } from "express";
import { UsuarioDatasourcesImpl } from "../../infrastructure/datasources/usuario.datasources.impl";
import { AppdataSources } from "../../db/TypeORM/dataSource";
import { UsuarioRepositoryImpl } from "../../infrastructure/repository/usuario.repositoy.impl";
import { UsuarioController } from "./controler";
import { BcryptServicesImpl } from "../../infrastructure/services/BcryptServices";
import { JwtServicesImpl } from "../../infrastructure/services/JwtServices";
import { verifyToken } from "../middlewares/verifyToken";

export class UsuarioRoutes {

    static get routes(): Router {
        
        const router = Router();

        const dataSource = new UsuarioDatasourcesImpl( AppdataSources );
        const usuarioRepository = new UsuarioRepositoryImpl( dataSource )
        const usuarioController = new UsuarioController( usuarioRepository,new BcryptServicesImpl(10), new JwtServicesImpl)

        router.get('/',verifyToken ,usuarioController.getUsuarios)
        router.post('/login', usuarioController.Login)
        router.delete('delete/:id', verifyToken, usuarioController.deleteUsuario)
        router.get('/:id', verifyToken, usuarioController.getUsuarioId)
        router.post('/', usuarioController.createUsuario)
        router.put('/actualizar', verifyToken ,usuarioController.UpdateUsuario)
        

        return router
    }

}