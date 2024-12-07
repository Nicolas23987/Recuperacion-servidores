import { promises } from "dns";
import { CreateUsuarioDto } from "../dtos/usuario/create-usuario-dto";
import { UpdateUsuarioDto } from "../dtos/usuario/update-usuario-dto";
import { UsuarioEntity } from "../entities/usuario";



export abstract class UsuarioRepository{

    abstract create( crateUsuario: CreateUsuarioDto):Promise<UsuarioEntity>
    abstract getAll():Promise<UsuarioEntity[]>
    abstract findById(id: number):Promise<UsuarioEntity>
    abstract findOneByEmail(email: string):Promise<UsuarioEntity>
    abstract updateById(updateUsuarioDto: UpdateUsuarioDto):Promise<UsuarioEntity>
    abstract deleteById(id: number):Promise<UsuarioEntity>

}