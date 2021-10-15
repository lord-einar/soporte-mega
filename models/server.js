const express = require("express");
const http = require("http");
const hbs = require("hbs");
const cors = require("cors");

const socketio = require("socket.io");
const redis = require("redis");
const { homeGET } = require("../controllers/home");
const { ejecutarComando } = require("../controllers/comandos");

class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();
    this.subscriber.subscribe("canal1");
    this.port = process.env.PORT;

    this.io = socketio(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.middlewares();
    this.routes();
    this.socket();
  }

  // escucha() {
  //   this.subscriber.on("message", async (channel, message) => {
  //     console.log(channel, message);
  //     ejecutarComando("192.168.150.45", "interrogate", function (resp) {
  //       console.log("3", resp);
  //     });
  //   });
  // }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo JSON
    this.app.use(express.json());

    //Handlebars
    this.app.set("view engine", "hbs");
    hbs.registerPartials(__dirname + "../views/partials");

    //Establecer carpeta publica
    this.app.use(express.static("public"));
  }

  socket() {

    this.subscriber.on("message", async (channel, message) => {
      console.log(channel, message);
      let sede = '192.168.150.45'
      let cmd = 'interrogate'
      
      let resp = await ejecutarComando(sede, cmd, function(d){
        console.log(d)
      });
      
      console.log('resp', resp)
    })

    this.io.on("connection", (socket) => {

      socket.on("conectado", () => {
        console.log("user Connect");
      });
      socket.on("mensaje", (nombre, mensaje) => {
        this.io.emit("mensajes", { nombre, mensaje });
      });
      socket.on("disconnect", () => {
        this.io.emit("mensajes", {
          servidor: "Servidor",
          mensaje: "El usuario se ha desconectado",
        });
      });
    });
  }

  routes() {
    this.app.use("/api/:mensaje", (req, res) => {
      const { mensaje } = req.params;

      this.publisher.publish("canal1", mensaje);

      res.send("Hello World!");
    });
    this.app.use("/", require("../routes/home"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
