const Admin = require('../models/adminApp');
const Cliente = require('../models/cliente');
const Cuenta = require('../models/cuenta');
const TipoDeCuenta = require('../models/tipoDeCuenta');
//Este archivo maneja validaciones personalizadas

const emailExiste = async (correo = '') => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Cliente.findOne({ correo });

    //Si existe (es true) lanzamos excepción
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya existe y esta registrado en la DB`);
    }

}


const existeUsuarioPorId = async (id) => {
    const models = [Admin, Cliente]; // Arreglo de modelos
    // Verificar si el usuario existe.
    let existeUser = null;
    for (const model of models) {
        existeUser = await model.findById(id);
        if (existeUser) {
            break;
        }
    }

    if (!existeUser) {
        throw new Error(`El id ${id} no existe en la DB`);
    }
}

const existeCuenta = async (id) => {
    const existeCuenta = await Cuenta.findOne({ _id: id });
    if (!existeCuenta) {
        throw new Error(`La cuenta: ${id} no existe en la DB`);
    }
    return existeCuenta;
}

const existeTipoCuenta = async (id) => {
    const existeTipoCuenta = await TipoDeCuenta.findOne({ _id: id });
    if (!existeTipoCuenta) {
        throw new Error(`El tipo de cuenta: ${id} no existe en la DB`);
    }
}

module.exports = {
    emailExiste,
    existeUsuarioPorId,
    existeCuenta,
    existeTipoCuenta
}