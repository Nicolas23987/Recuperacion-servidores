import bcrypt from 'bcryptjs'
import { PassThrough } from 'stream';


export interface BcryptServices {
    saltRounds:number;
    hashPassword( contraseña: string ):Promise<string>;
    comparePassword( contraseña: string, hashedPassword: string ):Promise<boolean>
}

// export class BcryptServices implements IBcryptServices{
//     private saltRounds = 10;

//     public async hashPassword( contraseña: string ):Promise<string>{
//         const salt = await bcrypt.genSalt(this.saltRounds)
//         return await bcrypt.hash(contraseña, salt)
//     }

//     public async comparePassword( contraseña: string, hashedPassword: string ):Promise<boolean>{
//         return await bcrypt.compare(contraseña, hashedPassword);
//     }

// }