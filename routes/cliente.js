//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getCliente, postCliente, putCliente, deleteCliente } = require('../controllers/cliente');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { NoEsAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', [
    validarJWT,
    NoEsAdminRole
], getCliente);

router.put('/editar', [
    validarJWT,
    NoEsAdminRole,
    validarCampos
] , putCliente);

router.delete('/eliminar', [
    validarJWT,
    NoEsAdminRole,
    validarCampos
] , deleteCliente);

module.exports = router;


// ROUTES