import { AuthUsuarioDto } from "../../dtos/usuario/auth-usuarioi-dto";
import { UsuarioEntity } from "../../entities/usuario";
import { UsuarioRepository } from "../../repository/usuario.repository";
import { BcryptServices } from "../../services/BcryptServices";
import { JwtServices } from "../../services/JwtServices";



export interface AuthUsuarioUseCase {
    execute(dto: AuthUsuarioDto):Promise<string>
}


export class AuthUsuario implements AuthUsuarioUseCase {

    constructor(
        private usuarioRepository: UsuarioRepository,
        private jwtService: JwtServices,
        private bcrypt: BcryptServices
    ){}

    async execute(dto: AuthUsuarioDto):Promise<string>{
        const usuario = await this.usuarioRepository.findOneByEmail( dto.email ) 
        if( !usuario ) throw ('Correo electronico incorreto');
        
        const IsValidContraseña = await this.bcrypt.comparePassword(dto.contraseña, usuario.contraseña)
        if ( !IsValidContraseña ) throw ('Contraseña incorrecta') 
        
        return this.jwtService.createToken(usuario)
    }
}