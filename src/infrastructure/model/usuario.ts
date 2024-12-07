import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class Usuario {
    @PrimaryColumn({primary: true})
    id?: number

    @Column() 
    nombre?: string;

    @Column({unique: true})
    email?: string;

    @Column()
    contraseña?: string;
    
}