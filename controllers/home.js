const { response } = require("express");
const { ejecutarComando } = require("./comandos");

const homeGET = async (req, res = response) => {
  const { sede, cmd } = req.params;
  let resp = await ejecutarComando(sede, cmd, function(d){
    console.log(d)
  });
  
  console.log(resp)
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
