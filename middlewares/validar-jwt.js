const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Admin = require('../models/adminApp');
const Cliente = require('../models/cliente');

const validarJWT = async( req = request, res= response, next ) => {

    const token = req.header('x-token');

    //Si no viene el token
    if ( !token ) {
        return res.status(401).json({
            error: 'No hay token en la petición'
        })
    }
    
    try {

        const { uid } = jwt.verify( token, process.env.SECRET_KEY_FOR_TOKEN);
        // leer al usuario que corresponda el uid
        const models = [Admin, Cliente]; // Arreglo de modelos

        // Verificar si es Admin App si no en Cliente
        let usuario = null;
        for (const model of models) {
            usuario = await model.findById({ _id: uid });
            if (usuario) {
                break;
            }
        }
        
        //Verificar si el uid del usuario no existe
        if ( !usuario ) {
            return res.status(401).json({
                error: 'Token no valido - usuario no existe en DB fisicamente'
            })
        }

        req.usuario = usuario;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: 'Token no válido'
        })
    }


}

module.exports = {
    validarJWT
}
