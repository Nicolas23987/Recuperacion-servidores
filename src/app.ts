import { envs } from "./config/envs";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { AppdataSources } from "./db/TypeORM/dataSource";
dotenv.config();






(async()=>{
    main();
})();


function main() {

    const server = new Server ({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
        dataSources: AppdataSources
    })

    server.start()

}