const { Router } = require('express');
const { comandosPOST } = require('../controllers/comandos');

const router = Router();



router.post('/', comandosPOST)



module.exports = router