let exec = require("child_process").exec;
var spawn = require("child_process").spawn;
const { response } = require("express");

const homeGET = async (req, res = response) => {
  const { sede, cmd } = req.params;
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

  const limpiarSalida = (salida) => {
    let code = 0;

    let regExp = salida.includes("ERROR")
      ? new RegExp("ERROR[\\s]+(\\d{4})")
      : new RegExp("ESTADO[\\s]+:\\s+([\\d+])");

    code = regExp.exec(salida);
    
    return res.send(estados.find(el => el.codigo == code[1]));
  };

  exec(
    `D:\\PSTools\\psexec.exe \\\\${sede} -u redmegatlon\\administrator -p Hugo2015! -h -s sc ${cmd} "Zabbix agent 2"`,
    function (error, stdout, stderr) {

      if (stdout !== "") {
        console.log("--------------");
        console.log(stdout.slice(125));

        // let index = stdout.indexOf('ERROR')
        // if(index >=0){
        //   console.log('Existe error en posicion '+ index)
        //   codigoEstado = stdout.slice(index+6, index+10)
        // }else {
        //   let index = stdout.indexOf('ESTADO')
        //   console.log('Existe ESTADO en posicion '+ index)
        //   codigoEstado = stdout.slice(index+21, index+22)
        // }
        console.log("--------------");

        return limpiarSalida(stdout.slice(125));
      }
      if (error !== null) {
        res.send(error);
      }
    }
  );
};

module.exports = {
  homeGET,
};
