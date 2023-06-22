//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getBeneficiario, getBeneficiarios, postBeneficiario, putBeneficiario, deleteBeneficiario } = require('../controllers/beneficiario');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { NoEsAdminRole } = require('../middlewares/validar-roles');
const { existeCuenta, existeTipoCuenta } = require('../helpers/db-validators');

const router = Router();

router.get('/mostrar/:id', [
    validarJWT,
    NoEsAdminRole
], getBeneficiario );

router.get('/mostrar-all', [
    validarJWT,
    NoEsAdminRole
], getBeneficiarios );

router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('no_cuenta', 'El número de cuenta es obligatorio').not().isEmpty(),
    check('no_cuenta').custom(existeCuenta),
    check('banco_del_beneficiario', 'El nombre del banco es obligatorio').not().isEmpty(),
    check('tipo_de_cuenta', 'El tipo de cuenta es obligatorio').not().isEmpty(),
    check('tipo_de_cuenta').custom(existeTipoCuenta),
    validarCampos,
    NoEsAdminRole
], postBeneficiario);

router.put('/editar/:id', [
    validarJWT,
    NoEsAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] , putBeneficiario);

router.delete('/eliminar/:id', [
    validarJWT,
    NoEsAdminRole,
    validarCampos
] , deleteBeneficiario);

module.exports = router;


// ROUTES