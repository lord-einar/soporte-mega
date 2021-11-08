const { response } = require("express");
const { ejecutarComando } = require("./comandos");

const homeGET = (req, res = response, ) => {
  const { sede, cmd } = req.params;

  return ejecutarComando(sede, cmd, function(d){
    console.log('3', d)
    return d
  });
  
  console.log('5', resp)
  // return resp
};


const apiGET = (req, res) => {
  const { mensaje } = req.params;
  publisher.publish("canal1", mensaje);

  res.send(mensaje);
}

module.exports = {
  homeGET,
  apiGET
};
