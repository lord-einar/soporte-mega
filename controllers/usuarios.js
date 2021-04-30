const {
    request,
    response
} = require('express')

const usuariosGET = (req, res = response) => {

    const query = req.query;

    res.json({
        msg: 'Hola mundo - GET - Controller'
    })
}

const usuariosPOST = (req, res = response) => {

    const body = req.body

    res.json({
        msg: 'Hola mundo - POST - Controller',
        body
    })
}

const usuariosPUT = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'Hola mundo - PUT - Controller',
        id
    })
}

const usuariosDELETE = (req, res = response) => {
    res.json({
        msg: 'Hola mundo - DELETE - Controller'
    })
}


module.exports = {

    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosDELETE
}