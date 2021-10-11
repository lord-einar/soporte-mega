const { Router } = require('express');
const { homeGET } = require('../controllers/home');

const router = Router();



router.get('/:sede/:cmd', homeGET)



module.exports = router