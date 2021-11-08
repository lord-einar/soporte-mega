let exec = require("child_process").exec;
let ping = require("ping");

const estados = [
  {
    codigo: 1062,
    msg: "El servicio se encuentra detenido",
  },
  {
    codigo: 1056,
    msg: "El servicio ya se está ejecutando",
  },
  {
    codigo: 3,
    msg: "Deteniendo servicio",
  },
  {
    codigo: 2,
    msg: "Iniciando servicio",
  },
  {
    codigo: 4,
    msg: "Servicio ejecutandose",
  },
];

const equipoOnline = (sede) => {
  return new Promise((resolve) => {
    var hosts = [sede];
    // ["192.168.104.10", "192.168.150.45", "192.168.134.2"]
    hosts.forEach(function (host) {
      ping.sys.probe(host, function (isAlive) {
        return resolve(isAlive)
      });
    });
  });
};

function ejecutarComando(sede, cmd) {

  return new Promise((resolve) => {
    equipoOnline(sede).then(online => {

      if (online){
        exec(
          `D:\\PSTools\\psexec.exe \\\\${sede} -u redmegatlon\\administrator -p Hugo2015! -h -s sc ${cmd} "QR Reader Service"`,
          function (error, stdout, stderr) {

            
            if (stderr !== "") {
              console.log("--------------");
              console.log(stderr.slice(125));
              console.log("--------------");

              limpiarSalida(stderr.slice(125))
              return resolve({
                codigo: 'error',
                msg: stderr,
              });
            }
            
            if (stdout !== "") {
              console.log("--------------");
              console.log(stdout.slice(125));
              console.log("--------------");
              
              resolve(limpiarSalida(stdout.slice(125)));
            }
          }
          );
        } else {  
          return resolve({
            codigo: 6,
            msg: "El equipo se encuentra apagado o sin red",
          });
        }
      })
    });
  }

const limpiarSalida = (salida) => {
  let code = 0;

  let regExp = salida.includes("code")
    ? new RegExp("code[\\s]+(\\d{4})")
    : new RegExp("ESTADO[\\s]+:\\s+([\\d+])");

  code = regExp.exec(salida);
  console.log('codigo: ',code)

  // return estados.find((el) => el.codigo == code[1]);
};

module.exports = {
  ejecutarComando,
};
