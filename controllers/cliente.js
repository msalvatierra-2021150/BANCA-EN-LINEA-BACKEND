const { response, request, json } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Cliente = require('../models/cliente');
const { postCuentaPrimeraVez } = require('../controllers/cuenta');

const getCliente = async (req = request, res = response) => {
    try {
        const query = { estado: true, _id: req.usuario.id };
        const cliente = await Cliente.findById(query);
        return res.json({
            msg: 'get Api - Controlador Cliente',
            cliente
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getClientes = async (req = request, res = response) => {
    try {
        const listaClientes = await Cliente.find();
        return res.json({
            msg: 'get Api - Controlador Cliente',
            listaClientes
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postCliente = async (req = request, res = response) => {
    try {
        const { ...resto } = req.body;
        const clienteGuardadoDB = new Cliente({ ...resto });
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        clienteGuardadoDB.password = bcrypt.hashSync(clienteGuardadoDB.password, salt);
        const cuentaCreada = await postCuentaPrimeraVez(clienteGuardadoDB.id, resto.tipo_de_cuenta, resto.saldoInicial);

        //Guardar en BD
        if(resto.ingresos_mensuales<100){
            return res.status(400).json({
                error:`El ingreso ${resto.ingresos_mensuales} no es suficiente`
            });         
        }

        await clienteGuardadoDB.save();
        return res.json({
            msg: 'Post Api - Post Cliente',
            clienteGuardadoDB
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const putCliente = async (req = request, res = response) => {
    try {
        const { id } = req.usuario;
        const { _id, nombre, DPI,primera_cuenta, direccion, nombre_de_trabajo, ingresos_mensuales, rol, ...resto } = req.body;
        //Si la password existe o viene en el req.body, la encripta
        if(ingresos_mensuales<100){
            return res.status(400).json({
                error:`El ingreso ${resto.ingresos_mensuales} no es suficiente`
            });         
        }
        if (resto.password) {
            //Encriptar password
            const salt = bcrypt.genSaltSync();
            resto.password = bcrypt.hashSync(resto.password, salt);
        }
       
        //Editar al cliente por el id
        const clienteEditado = await Cliente.findByIdAndUpdate(id, resto);
        return res.json({
            msg: 'PUT editar Cliente',
            clienteEditado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const putClienteViaAdmin = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { _id, DPI, password, tipo_de_cuenta, saldoInicial, ...resto } = req.body;
        //Editar al cliente por el id
        const clienteEditado = await Cliente.findByIdAndUpdate(id, resto);
        return res.json({
            msg: 'PUT editar Cliente',
            clienteEditado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCliente = async (req = request, res = response) => {
    try {
        const { id } = req.usuario;
        const clienteEliminado = await Cliente.findByIdAndDelete(id);
        return res.json({
            msg: 'DELETE eliminar Cliente',
            clienteEliminado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteClienteViaAdmin = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const clienteEliminado = await Cliente.findByIdAndDelete(id);
        return res.json({
            msg: 'DELETE eliminar Cliente',
            clienteEliminado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getCliente,
    getClientes,
    postCliente,
    putCliente,
    putClienteViaAdmin,
    deleteCliente,
    deleteClienteViaAdmin
}