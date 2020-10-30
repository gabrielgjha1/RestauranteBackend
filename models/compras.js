const { schema } = require('./usuario');

const {Schema,model} = require('mongoose');

const CompraSchema = Schema({

    pedido:{type:String,require:true,unique:false},
    enviado:{type:Boolean,default:false},
    precio:{type:Number,require:true,unique:false},
    cantidad:{type:String,require:true,unique:false},
    usuario:{type:Schema.Types.ObjectId,ref:'Usuarios'}



})

module.exports = model('compras',CompraSchema);