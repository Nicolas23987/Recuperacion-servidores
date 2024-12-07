import { throws } from "assert";
import { Router } from "express";
import express from 'express'
import cors from 'cors'
import compression from "compression";
import path from "path";
import { DataSource, SimpleConsoleLogger } from "typeorm";
import cookieParser from 'cookie-parser'



interface Options { 
    port: number,
    routes: Router,
    public_path: string,
    dataSources: DataSource
}

export class Server {

    private app = express()
    private readonly port: number;
    private readonly publicPath: string;
    private routes: Router;
    private dataSources: DataSource

    constructor( options: Options ){
        const { port, routes, public_path, dataSources } = options
        this.port = port
        this.publicPath = public_path,
        this.routes = routes,
        this.dataSources = dataSources
    }
    async start(){
        
        this.app.use( express.json() );
        this.app.use( cors() )
        this.app.use( compression() );
        this.app.use( express.urlencoded({ extended: true }))
        this.app.use( cookieParser() )

        this.app.use( express.static( this.publicPath ) );
        this.app.use(this.routes)

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${ this.publicPath}/index.html`)
        })

        await this.dataSources.initialize()
        console.log('Base de datos conectada')

        this.app.listen(this.port, () =>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }

}