import { CreateUsuarioDto } from "../../dtos/usuario/create-usuario-dto";
import { UsuarioEntity } from "../../entities/usuario";
import { UsuarioRepository } from "../../repository/usuario.repository";

export interface CreateUsuarioUseCase {
    execute (dto: CreateUsuarioDto):Promise<UsuarioEntity>
}

export class CreateUsuario implements CreateUsuarioUseCase {

    constructor(
        private repository: UsuarioRepository,
    ){}
    
    execute(dto: CreateUsuarioDto): Promise<UsuarioEntity> {
        return this.repository.create( dto )
    }

}