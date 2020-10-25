const express = require('express');
const {dbConnection} = require('./database/config');
var cors = require('cors');
require('dotenv').config();
//GCuyh53JZopFnUxG
//gabrielgjha2

//crear el servidor de express
const app = express();


//base de datos 
dbConnection();


//configurar cors
app.use(cors());

app.get('/', (req,res)=>{


    res.status(200).json({

        status:true,
        mensaje:"hola"
        
    })


});


app.listen(process.env.PORT,()=>{

    console.log('Servidor Corriendosssas'+process.env.PORT)

});