
export class UsuarioEntity {

    constructor(
        public  id: number, 
        public  nombre: string,
        public  email: string,
        public  contraseña: string
    ){} 

    public static  fromObject(object : {[key: string]:any}):UsuarioEntity {
        
        const { id, nombre, email, contraseña } = object;

        if ( !id )  throw ('Id del usuario es requerido')
        if ( !nombre ) throw ('nombre del usuario es requerido')
        if ( !email ) throw ('email del usuario es requerido')
        if ( !contraseña ) throw ('contraseña')

        return new UsuarioEntity( id, nombre, email, contraseña );

    }

}


