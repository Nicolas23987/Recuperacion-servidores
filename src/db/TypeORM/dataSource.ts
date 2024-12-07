import { DataSource } from "typeorm";
import { envs } from "../../config/envs";
import { Usuario } from "../../infrastructure/model/usuario";



export const AppdataSources = new DataSource ({
    type: 'postgres',
    url: envs.PG_URL,
    logger: "advanced-console",
    synchronize: true,
    entities: [Usuario]
});