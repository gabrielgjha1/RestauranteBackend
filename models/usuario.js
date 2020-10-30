const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        require:true,
    },
    usuario:{
        type:String,
        require:true,
        unique:true
    },
    email:{

        type:String,
        require:true,
        unique:true

    },
    password:{
        type:String,
    },
    rol:{
        type:String,
        require:true,
        default:'USER_ROLE'

    },
    direccion:{
        type:String,
        require:true
    },
    pedido:{
        type:Boolean,
        require:false,
        default:false
    }

});

module.exports = model('Usuarios',UsuarioSchema);