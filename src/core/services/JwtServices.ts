import { JwtPayload } from "jsonwebtoken";




export interface JwtServices {
    createToken( payload: object): string;
    verifyToken(token: string): object | null;
}