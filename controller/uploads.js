
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const {ActualizarImagen} = require('../helpers/Actualizar-imagen');
const fs = require('fs');
const GuardarImagen = (req,res)=>{


    const id = req.params.id


    //verificamos que se haya enviado alguna imagen
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send('No envio ningun archivo');
        }

        //traemos el archivo
        const file = req.files.imagen;
        //extraemos un arreglo con todos los elementos depues del punto
        const NombreCortado = file.name.split('.'); 
        //guardamos la extension del archivo
        const exprensionArchivo = NombreCortado[NombreCortado.length -1];

        //generar nombre del archivo
        const nombreArchivo = `${uuidv4()}.${exprensionArchivo}`;

        //ruta de donde se guardara
        const path = `./uploads/imagenes/${nombreArchivo}`;

        //mover la imagen
        file.mv(path, (err)=> {
            if (err){  
                return res.status(500).json({
                    status:false,
                    mensaje:'error al mover la imagen'
                });
            }

            //actualizar base de datos en el helper
            ActualizarImagen(id,path,nombreArchivo);
            return res.status(200).json({
        
                status:true,
                mensaje:'hola',
                nombreArchivo
        
            });

          });

}

const RetornarImagen = (req,res)=>{

    const foto = req.params.foto;

    const pathImg = path.join(__dirname,`../uploads/imagenes/${foto}`);
    
    if (fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname,`../uploads/no-image-found-360x250.png`);
        res.sendFile(pathImg);

    }
    
}


module.exports = {

    GuardarImagen,
    RetornarImagen
}