const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');
const Admin = require('../models/adminApp');
const Cliente = require('../models/cliente');


const login = async (req = request, res = response) => {
    const { username, password } = req.body;
    
    try {
        const models = [Admin, Cliente]; // Arreglo de modelos

        // Verificar si es Admin App, si no en cliente
        let usuario = null;
        for (const model of models) {
            usuario = await model.findOne({ username });
            if (usuario) {
                break;
            }
        }
        
        if (!usuario) throw ({ status: 400, msg: 'El Usuario ingresado no existe en la BD' });
        

        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) throw ({ status: 400,  msg: 'El Password ingresado no es correcto' });
        
        // Generate JWT
        const token = await generarJWT(usuario.id, usuario.rol, usuario.nombre);

        return res.json({
            msg: 'Login PATH',
            Usuario: username,
            password,
            token
        });

    } catch (error) {
        res.status(error.status || 500).json({ error: error.msg });
    }
};

module.exports = {
    login
};
