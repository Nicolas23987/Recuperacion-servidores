import { UsuarioEntity } from "../../entities/usuario"
import { CreateUsuarioDto } from "./create-usuario-dto"

export class UpdateUsuarioDto {
    private constructor(
        public readonly id: number,
        private readonly nombre: string,
        private readonly email: string,
        private readonly contraseña: string
    ){}

    get value() {

        const getObjet: {[key:string]:any} = {}
        if ( this.id ) return getObjet.id
        if ( this.nombre ) return getObjet.nombre
        if ( this.email ) return getObjet.email
        if ( this.contraseña ) return getObjet.contraseña

        return getObjet
    }

    static update(props: {[key:string]: any}):[string?, UpdateUsuarioDto?]{

      const {id, nombre, email, contraseña } = props
        if ( !id ) throw ('id de usuario es requerido')
        if ( !nombre ) throw ('nombre es requerido')
        if ( !email ) throw ('email es requerido')
        if ( !contraseña ) throw ('contraseña es requerida')

        return [ undefined, new UpdateUsuarioDto(id, nombre, email, contraseña )]

    }

}