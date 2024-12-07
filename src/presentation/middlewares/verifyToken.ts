import { Request, Response, NextFunction } from "express";
import { JwtServicesImpl } from "../../infrastructure/services/JwtServices";

const jwtServices = new JwtServicesImpl()

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.token
    console.log(token)
    if ( !token ) res.status(403).json({menssage:  'token es requerido'})
    const decode = jwtServices.verifyToken(token)
    if( !decode ) res.status(401).json({menssage: 'Token invalido o expirado'})
    next()
}