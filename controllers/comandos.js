const {
    response
} = require('express')

const comandosPOST = (req, res = response) => {

    return "Comando recibido"
}

module.exports = {
    comandosPOST
}