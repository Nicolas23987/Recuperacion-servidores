import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwtServices } from '../../core/services/JwtServices';
import { pathToFileURL } from 'url';




export class JwtServicesImpl implements JwtServices {

    private secret = 'nicolasKey'

    public createToken(payload: object): string {
        return jwt.sign(payload, this.secret, { expiresIn: '1h'})
    }

    public verifyToken(token: string): object | null {
        try{
        
            const decode = jwt.verify(token, this.secret)
            if( typeof decode === 'object' && decode !==null) {
                return decode as JwtPayload
            } 
            return null
        }catch(error){
            console.log(error)
            return null
        }
    }

} 