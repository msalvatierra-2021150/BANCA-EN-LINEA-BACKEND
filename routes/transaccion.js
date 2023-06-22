//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getTransaccion, getTransacciones, postTransaccion, deleteTransaccion, getTransaccionCuenta } = require('../controllers/transaccion');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminAppRole } = require('../middlewares/validar-roles');
const { existeCuenta } = require('../helpers/db-validators');

const router = Router();

router.get('/mostrar/:id',[
    validarJWT,
] , getTransaccion);

router.get('/mostrar-all',[
    validarJWT,
] , getTransacciones);


router.get('/mostrar-cuenta/:id',[
    validarJWT,
] , getTransaccionCuenta);

router.post('/agregar', [
    validarJWT,
    check('monto', 'El monto  obligatorio').not().isEmpty(),
    check('cuenta_destino').custom(existeCuenta),
    check('cuenta_origen').custom(existeCuenta),
    validarCampos,
] , postTransaccion );



router.delete('/eliminar/:id', [
    validarJWT,
    validarCampos
] , deleteTransaccion);

// ROUTER
module.exports = router;