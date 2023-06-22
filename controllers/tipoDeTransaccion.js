const { response, request } = require('express');
//Importación del modelo
const TipoDeTransaccion = require('../models/tipoDeTransaccion');

const getTipoDeTransaccion = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipoDeTransaccion = await TipoDeTransaccion.findById({ _id: id });
        return res.json({
            msg: 'get Api - Controlador Tipo De Transaccion',
            tipoDeTransaccion
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const getTipoDeTransacciones = async (req = request, res = response) => {
    try {
        const tipoDeTransaccion = await TipoDeTransaccion.find();
        return res.json({
            msg: 'get Api - Controlador Tipo De Transaccion',
            tipoDeTransaccion
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postTipoDeTransacciones = async (req = request, res = response) => {
    try {
        //Recibimos los datos del body y el id del usuario
        const { ...resto } = req.body;
        //Guardar en BD
        const tipoDeTransaccionGuardadoDB = new TipoDeTransaccion({ ...resto });
        await tipoDeTransaccionGuardadoDB.save();
        res.json({
            msg: 'Post Api - Post Tipo De Transaccion',
            tipoDeTransaccionGuardadoDB
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const putTipoDeTransacciones = async (req = request, res = response) => {
    try {
        const { ...resto } = req.body;
        const { id } = req.params;
        const tipoDeTranaccionEditado = await TipoDeTransaccion.findByIdAndUpdate(id, resto);
        return res.json({
            msg: 'PUT editar Tipo De Transaccion',
            tipoDeTranaccionEditado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const deleteTipoDeTransacciones = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipoDeTransaccionEliminado = await TipoDeTransaccion.findByIdAndDelete(id);
        return res.json({
            msg: 'DELETE eliminar Tipo De Transaccion',
            tipoDeTransaccionEliminado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getTipoDeTransaccion,
    getTipoDeTransacciones,
    postTipoDeTransacciones,
    putTipoDeTransacciones,
    deleteTipoDeTransacciones
}