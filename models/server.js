const express = require('express')
const cors = require('cors')

class Server {

    constructor() {

        this.app = express()
        this.port = process.env.PORT

        this.middlewares();
        this.routes();


    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo JSON
        this.app.use( express.json() )

        //Establecer carpeta publica
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use('/api/usuarios', require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }

}

module.exports = Server;