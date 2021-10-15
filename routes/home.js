const { Router } = require('express');
const { homeGET, apiGET } = require('../controllers/home');

const router = Router();



router.get('/:sede/:cmd', homeGET)
// router.get('/api:mensaje', apiGET)



module.exports = router