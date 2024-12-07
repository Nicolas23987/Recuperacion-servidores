import { Request, Response } from "express";
import { UsuarioRepository } from "../../core/repository/usuario.repository";
import { BcryptServicesImpl } from "../../infrastructure/services/BcryptServices";
import { JwtServicesImpl } from "../../infrastructure/services/JwtServices";
import { CreateUsuarioDto } from "../../core/dtos/usuario/create-usuario-dto";
import { UpdateUsuarioDto } from "../../core/dtos/usuario/update-usuario-dto";
import { MetadataWithSuchNameAlreadyExistsError } from "typeorm";





export class UsuarioController {

    constructor(
        private readonly usuarioRepository: UsuarioRepository,
        private readonly bcryptServices: BcryptServicesImpl,
        private readonly jwtServices: JwtServicesImpl,
    ) { }

    public UpdateUsuario = async(req: Request, res: Response) => {

        const [ error, updateUsuario ] = UpdateUsuarioDto.update( req.body )
        if ( !error && updateUsuario !== undefined ){
            const usuarioUp = await this.usuarioRepository.updateById(updateUsuario)
            res.status(200).json({
                status: true,
                menssage: "usuario actualizado con exito",
                usuarioUp
            })
        }

        res.status(404).json({
            menssage: 'Error al actualizar el usuario',
            error
        })

    }

    public createUsuario = async (req: Request, res: Response) => {
        const [error, createUsuarioDto] = CreateUsuarioDto.create(req.body)
        if (!error && createUsuarioDto !== undefined) {
            const newUsuario = await this.usuarioRepository.create(createUsuarioDto)
            res.status(200).json({
                status: true,
                menssage: 'Usuario creado con exito',
                newUsuario
            });
        }
        res.status(400).json({
            menssage: 'Error al verificar datos',
            error
        })
    }

    public getUsuarios = async (req: Request, res: Response) => {
        const usuarios = await this.usuarioRepository.getAll()
        res.json(usuarios)
    }


    public deleteUsuario = async (req: Request, res: Response) => {
        const id = +req.params.id
        try {
            const deleteUsuario = await this.usuarioRepository.deleteById(id)
            res.status(200).json({
                menssage: 'usuario eliminado correctamente',
                status: true,
                deleteUsuario
            })
        } catch (error) {
            res.status(404).json({
                error,
            })
        }

    }

    public getUsuarioId = async (req: Request, res: Response) => {
        const id = +req.params
        try {
            const usuario = await this.usuarioRepository.findById(id)
            res.status(200).json({
                message: 'usuario encontrado',
                usuario,
                status: true
            })
        } catch (error) {
            res.status(404).json({
                menssage: "Error al encontrar el usuario",
                error,
                status: false
            })
        }

    }

    public Login = async (req: Request, res: Response) => {
        try {
            const { email, contraseña } = req.body
            const usuario = await this.usuarioRepository.findOneByEmail(email)
            if (!this.bcryptServices.comparePassword(contraseña, usuario.contraseña)) throw 'Contraseña incorrecta'
            const token = this.jwtServices.createToken({ ...usuario })
            res.status(200).json({
                menssage: 'Login sucesfull',
                token
            })
        } catch (error) {
            res.json(404).json({
                menssage: 'error al iniciar session',
                error: error
            })
        }
    }
}