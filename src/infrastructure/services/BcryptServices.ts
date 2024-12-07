import { BcryptServices } from "../../core/services/BcryptServices";
import bcrypt from 'bcryptjs'






export class BcryptServicesImpl implements BcryptServices {

    saltRounds: number;

    constructor(
        saltRound: number) {
        this.saltRounds = saltRound
    }

    public async comparePassword(contraseña: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(contraseña, hashedPassword)
        } catch (error) {
            console.error('Error al comparar las contraseña:', error)
            throw new Error('Error al comparar las contraseñas.')
        }
    }

    public async hashPassword(contraseña: string): Promise<string> {

        try {
            const salt = await bcrypt.genSalt(this.saltRounds)
            return await bcrypt.hash(contraseña, salt)
        } catch (error) {
            console.error('Error al comparar las contraseñas')
            throw new Error('Error al hashear la contraseña:')

        }

    }



}