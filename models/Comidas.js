const {Schema,model} = require('mongoose');

const ComidasSchema = Schema ({

    nombre:{

        type:String,
        required:true

    },

    contenido:{

        type:String,
        required:true

    },
    precio:{

        type:Number,
        required:true

    },
    img:{
        type:String
    }

});

module.exports = model('Comidas',ComidasSchema);