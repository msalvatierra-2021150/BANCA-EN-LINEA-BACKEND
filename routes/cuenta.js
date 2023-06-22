//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getCuenta, getCuentas, getCuentasPorMovimiento, postCuentas, putCuentaActualizarSaldo, deleteCuenta, getCuentasAdmin } = require('../controllers/cuenta');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminAppRole } = require('../middlewares/validar-roles');

const router = Router();

//Puede Acceder el Cliente o el admin
router.get('/mostrar/:id',[
    validarJWT,
] , getCuenta);

//Puede Acceder el admin
router.get('/mostrar-all-client/:id',[
    validarJWT,
] , getCuentasAdmin);

//Puede Acceder el Cliente
router.get('/mostrar-all',[
    validarJWT,
] , getCuentas);

router.get('/mostrar-por-movimiento',[
    validarJWT,
    esAdminAppRole
] , getCuentasPorMovimiento);

router.post('/agregar', [
    validarJWT,
    check('cliente', 'El nombre es obligatorio').not().isEmpty(),
    check('tipo_de_cuenta', 'El tipo de cuenta es obligatorio').not().isEmpty(),
    check('saldo', 'El monto es obligatorio').not().isEmpty(),
    validarCampos,
] , postCuentas);


router.put('/actualizar-saldo/:id', [
    validarJWT,
    check('saldoCambiante', 'El monto es obligatorio').not().isEmpty(),
    validarCampos
] , putCuentaActualizarSaldo);


router.delete('/eliminar/:id', [
    validarJWT,
    esAdminAppRole,
    validarCampos
] , deleteCuenta);

// ROUTER
module.exports = router;