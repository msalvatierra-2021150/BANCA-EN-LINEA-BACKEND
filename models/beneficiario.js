const { Schema, model } = require('mongoose');

const BeneficiarioSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre del usuario es obligatorio']
    },
    no_cuenta: {
        type: Schema.Types.ObjectId,
        ref: 'Cuenta',
        required: true
    },
    banco_del_beneficiario : {
        type: String,
        required: [true, 'El nombre del banco es obligatorio']
    },
    tipo_de_cuenta: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDeCuenta',
        required: true
    }
});


module.exports = model('Beneficiario', BeneficiarioSchema);