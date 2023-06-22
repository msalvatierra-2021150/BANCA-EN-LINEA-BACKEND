const { Schema, model } = require('mongoose');

const TipoDeTransaccionSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
});


module.exports = model('TipoDeTransaccione', TipoDeTransaccionSchema);