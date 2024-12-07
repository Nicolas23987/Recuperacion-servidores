


export class CreateUsuarioDto {

    private constructor(
        private readonly nombre: string,
        private readonly email: string, 
        private readonly contraseña: string
    )
    {}

    static create( props: {[key:string]: any} ):[string?, CreateUsuarioDto?]{
        const { nombre, email, contraseña } = props
        
        if( !nombre ) throw ('nombre es requerido')
        if( !email ) throw ('email es requerido')
        if( !contraseña) throw ('contraseña es requerida')

        return [ undefined, new CreateUsuarioDto( nombre, email, contraseña ) ]
    }

}


