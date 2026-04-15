// framework para crear backend

import express from "express";

// importar moddlewares

import cors from "cors";
import morgan from "morgan";
import {dirname} from "path";
import { fileURLToPath } from "url";
import './bdConfig.js'

// se crea un objeto que represente al SERVIDOR. el back-end Siempre tiene que estar ejecutándose
export default class Server {
    constructor() {
        // app se usa para hacer referencia a express
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.middlewares()
    }

    // metodos
    middlewares() {
        // incializamos los middlewares que necesitamos

        this.app.use(cors()); // permite escuchar conexiones remotas
        this.app.use(express.json()); // permite interpretar los datos JSON que llegan en una solicitud
        this.app.use(morgan('dev')); // ofrece datos extras en la terminal del backend (get, put, ...)
        
        //archivo estático /public/index.html
        const __dirname = dirname(fileURLToPath(import.meta.url));
        console.log(__dirname+'../../public')
        this.app.use(express.static(__dirname+'/../../public'))
    }

    // para que arranque el backend
    listen() {
        this.app.listen(this.port, () => console.info(`El servidor se está ejecutando en el puerto: http://localhost:${this.port}/`))
    }
}