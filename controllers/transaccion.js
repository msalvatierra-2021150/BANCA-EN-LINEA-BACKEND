const { response, request } = require('express');

//Importación del modelo
const Transaccion = require('../models/transacciones');
const Cuenta = require('../models/cuenta');
const { existeCuenta } = require('../helpers/db-validators');
const Cliente = require('../models/cliente');

const getTransaccion = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const transaccion = await Transaccion.findById(id);
        return res.json({
            msg: 'get Api - Controlador Transaccion',
            transaccion
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTransacciones = async (req = request, res = response) => {
    try {
        const { id } = req.usuario;
        const listaTransacciones = await Transaccion.find({ transaccion_del_cliente: id })
            .populate('tipo_de_transaccion', 'nombre').populate('transaccion_del_cliente', 'nombre');
        return res.json({
            msg: 'get Api - Controlador Transacciones',
            listaTransacciones
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTransaccionCuenta = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const transaccion = await Transaccion.find({ cuenta_origen: id })
            .populate('tipo_de_transaccion', 'nombre').populate('transaccion_del_cliente', 'nombre');
        return res.json({
            msg: 'get Api - Controlador Transaccion',
            transaccion
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postTransaccion = async (req = request, res = response) => {
    try {
        //Recibimos los datos del body y el id del usuario
        const { ...resto } = req.body;
        const { id } = req.usuario;
        //Validamos que existan las cuentas
        let cuenta_origen = await existeCuenta(resto.cuenta_origen);
        let cuenta_destino = await existeCuenta(resto.cuenta_destino);
        let monto = parseInt( resto.monto);
        console.log(monto);
       
        //Validamos que la cuenta origen tenga saldo suficiente
        if (cuenta_origen.saldo < monto)
        return res.status(400).json({
            error:'No tiene saldo suficiente para realizar la transacción' 
        }); 
        //Validamos que la cuenta origen y destino sean diferentes
        if (cuenta_origen._id.toString() == cuenta_destino._id.toString()) 
        return res.status(400).json({
            error:'No puede transferir a la misma cuenta'
        }); 
        //Validamos que el monto sea mayor a 0 y menor a 10000
        if (monto <= 0) 
        return res.status(400).json({
            error:'El monto a transferir debe ser diferente de 0'
        }); 
        if (monto > 10000) 
        return res.status(400).json({
            error:'El monto a transferir debe ser menor a 10000'
        }); 
        //Actualizamos los saldos
        const cuenta_origen_saldo = await Cuenta.findByIdAndUpdate(cuenta_origen._id, { saldo: cuenta_origen.saldo - monto }, { new: true });
        const cuenta_destino_saldo = await Cuenta.findByIdAndUpdate(cuenta_destino._id, { saldo: cuenta_destino.saldo + monto }, { new: true });
        const transaccionDebitadaGuardadaDB = new Transaccion({ ...resto, transaccion_del_cliente: id });

        /*Encontrar al cliente destino para guardar su transaccion como credito*/
        let userDestino = await Cliente.findById({_id: cuenta_destino.cliente});

        const transaccionAcreditadaGuardadaDB = new Transaccion({ 
            cuenta_origen: resto.cuenta_destino,
            cuenta_destino:  resto.cuenta_origen,
            tipo_de_transaccion:  resto.tipo_de_transaccion ,
            tipo_de_ingreso: 'CREDITO' , 
            monto: resto.monto,
            transaccion_del_cliente: userDestino._id}
        );
        
        //Guardar transaccion en BD
        await transaccionDebitadaGuardadaDB.save();
        await transaccionAcreditadaGuardadaDB.save();

        return res.json({
            msg: 'Transaccion realizada con exito',
            cuenta_origen_saldo,
            cuenta_destino_saldo,
        });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.msg });
    }
}

const deleteTransaccion = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        //Eliminar registro de la BD
        const TransaccionEliminada = await Transaccion.findByIdAndDelete(id);
        return res.json({
            msg: 'DELETE eliminar Transaccion',
            TransaccionEliminada
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getTransaccion,
    getTransacciones,
    getTransaccionCuenta,
    postTransaccion,
    deleteTransaccion
}