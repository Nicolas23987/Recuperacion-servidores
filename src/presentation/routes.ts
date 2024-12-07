import { Router } from "express"
import { UsuarioRoutes } from "./usuario/router"







export class AppRoutes {


    static get routes(): Router {
        const router = Router()
    
        router.use('/api/usuario', UsuarioRoutes.routes )

        return router
    
    }

}