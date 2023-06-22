//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getTipoDeTransaccion, getTipoDeTransacciones,postTipoDeTransacciones, putTipoDeTransacciones, deleteTipoDeTransacciones } = require('../controllers/tipoDeTransaccion');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminAppRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar/:id',[
    validarJWT,
    esAdminAppRole
] , getTipoDeTransaccion);

router.get('/mostrar-all',[
    validarJWT,
] , getTipoDeTransacciones);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
] , postTipoDeTransacciones);


router.put('/editar/:id', [
    validarJWT,
    esAdminAppRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] , putTipoDeTransacciones);


router.delete('/eliminar/:id', [
    validarJWT,
    esAdminAppRole,
    validarCampos
] , deleteTipoDeTransacciones);

// ROUTER
module.exports = router;