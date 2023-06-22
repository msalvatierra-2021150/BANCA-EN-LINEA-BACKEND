const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true
    },
    DPI: {
        type: String,
        required: [true, 'El DPI es obligatorio'],
        unique: true
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatoria']
    },
    celular: {
        type: String,
        required: [true, 'El Numero de telefono es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    nombre_de_trabajo: {
        type: String,
        required: [true, 'El nombre del trabajo es obligatorio'],
    },
    ingresos_mensuales: {
        type: Number,
        required: [true, 'El ingreso mensual es obligatorio'],
    },
    rol: {
        type: String,
        default: "CLIENTE_ROLE"
    }
});

module.exports = model('Cliente', ClienteSchema);