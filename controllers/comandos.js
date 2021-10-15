let exec = require("child_process").exec;

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



function ejecutarComando (sede, cmd, callback) {

    let datos;

    exec(`D:\\PSTools\\psexec.exe \\\\${sede} -u redmegatlon\\administrator -p Hugo2015! -h -s sc ${cmd} "Zabbix agent 2"`,
    function (error, stdout, stderr) {
        if (stdout !== "") {
            console.log("--------------");
            console.log(stdout.slice(125));
            console.log("--------------");
        
        let resp = limpiarSalida(stdout.slice(125));

        return callback(resp)
        
    }
    if (error !== null) {
        return pepe(error);
    }
}

    
    );
    return new Promise(resolve => {
        resolve(datos)
    })
} 

const limpiarSalida = (salida) => {
    let code = 0;

    let regExp = salida.includes("ERROR")
      ? new RegExp("ERROR[\\s]+(\\d{4})")
      : new RegExp("ESTADO[\\s]+:\\s+([\\d+])");

    code = regExp.exec(salida);

    return estados.find((el) => el.codigo == code[1]);
  };

module.exports = {
  ejecutarComando,
};
