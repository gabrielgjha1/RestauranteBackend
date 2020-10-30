const express = require('express');
const {dbConnection} = require('./database/config');
var cors = require('cors');
var path  = require('path');
require('dotenv').config();
//GCuyh53JZopFnUxG
//gabrielgjha2

//crear el servidor de express
const app = express();




//configurar cors
app.use(cors());

//lectuara y parseo del body 
app.use(express.json());

//base de datos 
dbConnection();

//directorioPublico
app.use(express.static('public'))

app.use('/api/usuarios',require('./routes/usuario'));
app.use('/api/login',require('./routes/login'));
app.use('/api/comidas',require('./routes/comidas'));
app.use('/api/uploads',require('./routes/uploads'));
app.use('/api/compras',require('./routes/compras' ))

app.get('*', (req,res)=>{

    res.sendFile(path.resolve(__dirname,'public/index.html'))

})

app.listen(process.env.PORT,()=>{

    console.log('Servidor Corriendosssas'+process.env.PORT)

});