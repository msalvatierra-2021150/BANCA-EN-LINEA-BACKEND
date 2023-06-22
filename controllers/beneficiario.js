const { response, request } = require('express');

//Importación del modelo
const Beneficiario = require('../models/beneficiario');

const getBeneficiario = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const beneficiario = await Beneficiario.findById(id);
        return res.json({
            msg: 'get Api - Controlador Beneficiario',
            cliente: beneficiario
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getBeneficiarios = async (req = request, res = response) => {
    try {
        const { id } = req.usuario;
        const listaBeneficiarios = await Beneficiario.find({ usuario: id })
        .populate('tipo_de_cuenta', 'nombre');
        return res.json({
            msg: 'get Api - Controlador Beneficiarios',
            listaBeneficiarios
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postBeneficiario = async (req = request, res = response) => {
    try {
        const { ...resto } = req.body;
        const { id } = req.usuario;
        const beneficiarioGuardadoDB = new Beneficiario({ ...resto, usuario: id });
        //Guardar en BD
        await beneficiarioGuardadoDB.save();
        res.json({
            msg: 'Post Api - Post Beneficiario',
            beneficiarioGuardadoDB
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const putBeneficiario = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { usuario, no_cuenta, banco_del_beneficiario, tipo_de_cuenta, ...resto } = req.body;
        //Editar al cliente por el id
        const beneficiarioEditado = await Beneficiario.findByIdAndUpdate(id, resto);
        return res.json({
            msg: 'PUT editar Beneficiario',
            beneficiarioEditado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteBeneficiario = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const beneficiariEliminado = await Beneficiario.findByIdAndDelete(id);
        return res.json({
            msg: 'DELETE eliminar Cliente',
            beneficiariEliminado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getBeneficiario,
    getBeneficiarios,
    postBeneficiario,
    putBeneficiario,
    deleteBeneficiario,
}