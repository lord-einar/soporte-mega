const { Router } = require('express');
const { usuariosGET, usuariosPOST, usuariosPUT, usuariosDELETE } = require('../controllers/usuarios');

const router = Router();



router.get('/', usuariosGET)

router.post('/', usuariosPOST)

router.put('/:id', usuariosPUT)

router.delete('/', usuariosDELETE)


module.exports = router