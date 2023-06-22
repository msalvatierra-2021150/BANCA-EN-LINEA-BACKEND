const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const adminApp = require('../models/adminApp');
const Cuenta = require('../models/cuenta');
const TipoDeCuenta = require('../models/tipoDeCuenta');
const Transacciones = require('../models/transacciones');

const adminAppDefCreate = async (req, res) => {
    try {
        let newAdminApp = new adminApp();
        newAdminApp.nombre = "Administrador de BANCO SANTANDER";
        newAdminApp.username = "ADMINB";
        newAdminApp.correo = "adminb@corrreo.com";
        newAdminApp.password = "ADMINB";
        newAdminApp.rol = "ADMIN_APP";

        const adminEncontrado = await adminApp.findOne({ username: newAdminApp.username });
        if (adminEncontrado) return console.log("El administrador está listo");

        newAdminApp.password = bcrypt.hashSync(newAdminApp.password, bcrypt.genSaltSync());
        newAdminApp = await newAdminApp.save();

        if (!newAdminApp) return console.log("El administrador no está listo!");

        return console.log("El administrador está listo!");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAdmin = async (req = request, res = response) => {
    try {
        const query = { _id: req.usuario.id };
        const admin_app = await adminApp.findById(query);
        return res.json({
            msg: 'get Api - Controlador Admin',
            admin_app
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const postTransferencia = async (req = request, res = response) => {
    
    const { tipo } = req.body;
    const prueba = parseInt(`${tipo}1`)
    const pipeline = [
        { $group: { _id: '$cuenta_origen', count: { $sum: 1 },totalAmount: { $sum: '$monto' }  } },
        { $match: { count: { $gte: 2 } } },
        { $sort: { totalAmount:prueba} } 
      ];
      try {
        const result = await Transacciones.aggregate(pipeline);
           
        return res.json({
            msg: 'DELETE eliminar Cliente',
            result
        });
      } catch (error) {
        console.log('Error al ejecutar la consulta de agregación:', error);
        res.status(500).json({ error: 'Error al ejecutar la consulta de agregación' });
      }
    
  }
const postAdmin = async (req = request, res = response) => {
    try {
        //Desestructuración
        const { ...resto } = req.body;
        const adminGuardadoDB = new adminApp({ ...resto });
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        adminGuardadoDB.password = bcrypt.hashSync(adminGuardadoDB.password, salt);    
        //Guardar en BD
        await adminGuardadoDB.save();
        return res.json({
            msg: 'Post Api - Post Admin',
            adminGuardadoDB
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const putAdmin = async (req = request, res = response) => {
    try {
        const id = req.usuario.id;
        const { _id, rol, ...resto } = req.body;    
        //Si la password existe o viene en el req.body, la encripta
        if (resto.password) {
            //Encriptar password
            const salt = bcrypt.genSaltSync();
            resto.password = bcrypt.hashSync(resto.password, salt);
        }    
        const adminEditado = await adminApp.findByIdAndUpdate(id, resto);
        return res.json({
            msg: 'PUT API - editar Admin',
            adminEditado
        });        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteAdmin = async (req = request, res = response) => {
    try {
        const { id } = req.usuario;
        const clienteEliminado = await adminApp.findByIdAndDelete(id);
        return res.json({
            msg: 'DELETE eliminar Cliente',
            clienteEliminado
        });        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
  const getClienteS = async (req = request, res = response) => {
    const clientes = await Cliente.find();
    const result = []
    for(let x=0; x<clientes.length;x++){
        const clienteId = clientes[x];
       
        const cuentas = await Cuenta.find({cliente:clienteId});

        for (let i = 0; i < cuentas.length; i++) {
            const cuenta = cuentas[i];
            const tipoCuenta = await TipoDeCuenta.findById(cuenta.tipo_de_cuenta);
            result.push({ cliente: clienteId._id, saldo: cuenta.saldo, tipoDeCuenta: tipoCuenta.nombre });
        }
        
       
    }
    res.json(result);
}


module.exports = {
    getAdmin,
    postAdmin,
    putAdmin,
    deleteAdmin,
    adminAppDefCreate,
    postTransferencia,
    getClienteS
}