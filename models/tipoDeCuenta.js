const { Schema, model } = require('mongoose');

const TipoDeCuentaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
});


module.exports = model('TipoDeCuenta', TipoDeCuentaSchema);