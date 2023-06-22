//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getTipoDeCuenta, getTipoDeCuentas,postTipoDeCuenta, putTipoDeCuenta, deleteTipoDeCuenta } = require('../controllers/tipoDeCuenta');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminAppRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar/:id',[
    validarJWT,
    esAdminAppRole
] , getTipoDeCuenta);

router.get('/mostrar-all',[
    validarJWT,
] , getTipoDeCuentas);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
] , postTipoDeCuenta);


router.put('/editar/:id', [
    validarJWT,
    esAdminAppRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] , putTipoDeCuenta);


router.delete('/eliminar/:id', [
    validarJWT,
    esAdminAppRole,
    validarCampos
] , deleteTipoDeCuenta);

// ROUTER
module.exports = router;