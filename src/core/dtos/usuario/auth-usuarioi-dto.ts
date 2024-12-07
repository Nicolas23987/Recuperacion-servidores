



export class AuthUsuarioDto {

    private constructor(
        public readonly email: string,
        public readonly contraseña: string
    ){}

    static AuthUsuario(props: {[key: string]: any}):[string?, AuthUsuarioDto?]{
        const { email, contraseña } = props
        if ( !email ) throw ('email es requerido')
        if ( !contraseña ) throw ('contraseña es requerida')
        
        return [undefined, new AuthUsuarioDto(email, contraseña)]
    } 

}