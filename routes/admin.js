//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getAdmin, postAdmin, putAdmin, deleteAdmin , postTransferencia,getClienteS} = require('../controllers/admin');
const { getClientes, postCliente, putClienteViaAdmin, deleteClienteViaAdmin} = require('../controllers/cliente');
const { emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminAppRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar',[
    validarJWT,
    esAdminAppRole
] , getAdmin);

router.get('/mostrar-clientes',[
    validarJWT,
    esAdminAppRole
] , getClientes);

router.post('/mostrar-transferenciasA',[
    validarJWT,
    esAdminAppRole
 ] , postTransferencia);
 
router.post('/agregar-admin', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('username', 'El nombre de Usuario es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    validarCampos,
] , postAdmin);

router.post('/agregar-cliente', [
    validarJWT,
    esAdminAppRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    validarCampos,
] , postCliente);

router.put('/editar-admin', [
    validarJWT,
    esAdminAppRole,
    validarCampos
] , putAdmin);

router.put('/editar-cliente/:id', [
    validarJWT,
    esAdminAppRole,
    validarCampos
] , putClienteViaAdmin);

router.delete('/eliminar-admin', [
    validarJWT,
    esAdminAppRole,
    validarCampos
] , deleteAdmin);

router.delete('/eliminar-cliente/:id', [
    validarJWT,
    esAdminAppRole,
    validarCampos
] , deleteClienteViaAdmin);



// ROUTER
module.exports = router;