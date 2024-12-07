import { UpdateUsuarioDto } from "../../dtos/usuario/update-usuario-dto";
import { UsuarioEntity } from "../../entities/usuario";
import { UsuarioRepository } from "../../repository/usuario.repository";





export interface UpdateUsuarioUseCase {
    execute (dto: UpdateUsuarioDto):Promise<UsuarioEntity>
}

export class UpdateUsuario implements UpdateUsuario {

    constructor(
        public readonly repository: UsuarioRepository 
    ){}

    execute (dto: UpdateUsuarioDto):Promise<UsuarioEntity>{
           return this.repository.updateById( dto )
    }
}