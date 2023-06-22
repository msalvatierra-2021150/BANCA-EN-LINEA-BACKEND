const { Schema, model } = require('mongoose');

const TransaccionSchema = Schema({
    transaccion_del_cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    cuenta_destino: {
        type: Schema.Types.ObjectId,
        ref: 'Cuenta',
        required: true
    },
    cuenta_origen: {
        type: Schema.Types.ObjectId,
        ref: 'Cuenta',
        required: true
    },
    tipo_de_transaccion: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDeTransaccione',
        required: true
    },
    monto :{
        type: Number,
        required: [true, 'El monto es obligatorio' ],
    },
    fecha_y_hora: {
        type: Date,
        default: Date.now  
    },
    tipo_de_ingreso: {
        type: String,
        default: 'DEBITO'
    }
});


module.exports = model('Transaccione', TransaccionSchema);