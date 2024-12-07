import { UsuarioDatasources } from "../../core/datasources/usuario.datasources";
import { CreateUsuarioDto } from "../../core/dtos/usuario/create-usuario-dto";
import { UpdateUsuarioDto } from "../../core/dtos/usuario/update-usuario-dto";
import { UsuarioEntity } from "../../core/entities/usuario";
import { UsuarioRepository } from "../../core/repository/usuario.repository";

export class UsuarioRepositoryImpl implements UsuarioRepository {

    constructor(
        private readonly datasources: UsuarioDatasources
    ){}

    create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
        return this.datasources.create( createUsuarioDto )
    }

    deleteById(id: number): Promise<UsuarioEntity> {
        return this.datasources.deleteById(id)
    }

    findById(id: number): Promise<UsuarioEntity> {
        return this.datasources.findById( id )        
    }
    
    getAll(): Promise<UsuarioEntity[]> {
        return this.datasources.getAll()    
    }

    updateById(updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioEntity> {
        return this.datasources.updateById( updateUsuarioDto )
    }

    findOneByEmail(email: string): Promise<UsuarioEntity> {
        return this.datasources.findOneByEmail(email)
    }

}