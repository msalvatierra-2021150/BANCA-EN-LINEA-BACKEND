const { response, request } = require('express');

//Importación del modelo
const Cuenta = require('../models/cuenta');

const getCuenta = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const cuenta = await Cuenta.findById(id);
        return res.json({
            msg: 'get Api - Controlador Cuenta',
            cuenta
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCuentas = async (req = request, res = response) => {
   
    try {
        const { id } = req.usuario;
       
        const listaCuentas = await Cuenta.find({ cliente: id }).populate('tipo_de_cuenta', 'nombre');
        
        return res.json({
            msg: 'get Api - Controlador Cuentas',
            listaCuentas
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCuentasAdmin = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const listaCuentas = await Cuenta.find({ cliente: id }).populate('tipo_de_cuenta', 'nombre');
        return res.json({
            msg: 'get Api - Controlador Cuentas',
            listaCuentas
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCuentasPorMovimiento = async (req = request, res = response) => {
    try {
        const listaCuentas = await Cuenta.find();
        return res.json({
            msg: 'get Api - Controlador Cuentas Por Movimiento',
            listaCuentas
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postCuentas = async (req = request, res = response) => {
    try {
        const { ...resto } = req.body;
        const { id } = req.usuario;
        const cuentaGuardadaDB = new Cuenta({ ...resto, usuario: id });
        //Guardar en BD
        await cuentaGuardadaDB.save();
        res.json({
            msg: 'Post Api - Post Cuenta',
            cuentaGuardadaDB
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postCuentaPrimeraVez = async (id, tipo_de_cuenta, saldoInicial) => {
    try {
        const cuentaGuardadaDB = new Cuenta({ cliente: id, tipo_de_cuenta: tipo_de_cuenta, saldo: saldoInicial });
        //Guardar en BD
        await cuentaGuardadaDB.save();
        return cuentaGuardadaDB.id;
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

//Actualiza Saldo
const putCuentaActualizarSaldo = async (req = request, res = response) => {
    try {
        const { ...resto } = req.body;
        const { id } = req.params;
        //Obtener el saldo actual
        let { saldo } = await Cuenta.findById(id);
        if (resto.restar) {
            saldo -= resto.saldoCambiante;
        } else {
            saldo += resto.saldoCambiante;
        }
        //Editar la Cuenta por el id
        const cuentaEditado = await Cuenta.findByIdAndUpdate(id, { saldo });
        return res.json({
            msg: 'PUT editar Cuenta',
            cuentaEditado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCuenta = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const CuentaEliminada = await Cuenta.findByIdAndDelete(id);
        return res.json({
            msg: 'DELETE eliminar Cuenta',
            CuentaEliminada
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getCuenta,
    getCuentas,
    getCuentasAdmin,
    getCuentasPorMovimiento,
    postCuentas,
    postCuentaPrimeraVez,
    putCuentaActualizarSaldo,
    deleteCuenta,
}