// src/infrastructure/repositories/UsuarioRepositoryImpl.ts
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { UsuarioEntity } from "../../core/entities/usuario";
import { CreateUsuarioDto } from "../../core/dtos/usuario/create-usuario-dto";
import { UpdateUsuarioDto } from "../../core/dtos/usuario/update-usuario-dto";
import { Usuario } from "../model/usuario";
import { UsuarioDatasources } from "../../core/datasources/usuario.datasources";

@injectable()
export class UsuarioDatasourcesImpl implements UsuarioDatasources {

    private usuarioRepository: Repository<Usuario>;

    constructor(@inject("DataSource") private dataSource: DataSource) {
        this.usuarioRepository = this.dataSource.getRepository(Usuario);
    }

    async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
        const Usuario = this.usuarioRepository.create({
            ...createUsuarioDto
        });
        const savedUsuario = await this.usuarioRepository.save(Usuario);
        return UsuarioEntity.fromObject(savedUsuario);
    }

    async getAll(): Promise<UsuarioEntity[]> {
        const usuarios = await this.usuarioRepository.find();
        return usuarios.map(usuario => UsuarioEntity.fromObject(usuario));
    }

    async findById(id: number): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuario) throw (`Usuario con id ${id} no encontrado`)
        return UsuarioEntity.fromObject(usuario);
    }

    async updateById(updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioEntity> {
        const prestamista = await this.findById(updateUsuarioDto.id);
        Object.assign(prestamista, updateUsuarioDto)
        const UsuarioSave = await this.usuarioRepository.save(prestamista)
        return UsuarioEntity.fromObject(UsuarioSave)
    }

    async deleteById(id: number):Promise<UsuarioEntity> {
        const usuario = await this.findById(id)
        await this.usuarioRepository.remove(usuario);
        return UsuarioEntity.fromObject(usuario)
    }

    async findOneByEmail(email: string): Promise<UsuarioEntity> {
        const usuarioEmail = await this.usuarioRepository.findOne({where: {email}})
        if ( !usuarioEmail) throw ('Email incorrecto');
       
        return UsuarioEntity.fromObject(usuarioEmail)
    }

}
