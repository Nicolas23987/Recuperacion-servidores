import { UsuarioEntity } from "../../entities/usuario";
import { UsuarioRepository } from "../../repository/usuario.repository";




export interface GetAllUsuariosUseCase {
    execute():Promise<UsuarioEntity[]>
}



export class GetAllUsuarios implements GetAllUsuariosUseCase {
    
    constructor(
        private readonly repository: UsuarioRepository
    ){}
    execute(): Promise<UsuarioEntity[]> {
        return this.repository.getAll()
    }

}