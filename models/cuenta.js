const { Schema, model } = require('mongoose');

const CuentaSchema = Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    tipo_de_cuenta: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDeCuenta',
        required: true
    },
    saldo :{
        type: Number,
        required: [true, 'El saldo es obligatorio' ],
    },
    fecha_y_hora_de_apertura: {
        type: Date,
        default: Date.now  
    }
});


module.exports = model('Cuenta', CuentaSchema);