const { Router } = require('express');
const { check } = require('express-validator');

//Controllers
const { login } = require('../controllers/auth');
// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

//Manejo de rutas
router.post('/login', [
    check('username', 'El Usuario es obligatoria').not().isEmpty(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos,
] ,login);


module.exports = router;