const { response, request } = require('express');
//Importación del modelo
const TipoDeCuenta = require('../models/tipoDeCuenta');

const getTipoDeCuenta = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipoDeCuenta = await TipoDeCuenta.findById({ _id: id });
        return res.json({
            msg: 'get Api - Controlador Tipo de Cuenta',
            tipoDeCuenta
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTipoDeCuentas = async (req = request, res = response) => {
    try {
        const tipoDeCuentas = await TipoDeCuenta.find();
        return res.json({
            msg: 'get Api - Controlador Tipo De Cuenta',
            tipoDeCuentas
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postTipoDeCuenta = async (req = request, res = response) => {
    try {
        const { ...resto } = req.body;
        const tipoGuardadoDB = new TipoDeCuenta({ ...resto });
        await tipoGuardadoDB.save();
        res.json({
            msg: 'Post Api - Post Tipo De Cuenta',
            tipoGuardadoDB
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const putTipoDeCuenta = async (req = request, res = response) => {
    try {
        const { ...resto } = req.body;
        const { id } = req.params;
        const tipoDeCuentaEditado = await TipoDeCuenta.findByIdAndUpdate(id, resto);
        return res.json({
            msg: 'PUT editar Tipo De Cuenta',
            tipoDeCuentaEditado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteTipoDeCuenta = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipoDeCuentaEliminado = await TipoDeCuenta.findByIdAndDelete(id);
        return res.json({
            msg: 'DELETE eliminar Tipo de Cuenta',
            tipoDeCuentaEliminado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getTipoDeCuenta,
    getTipoDeCuentas,
    postTipoDeCuenta,
    putTipoDeCuenta,
    deleteTipoDeCuenta
}