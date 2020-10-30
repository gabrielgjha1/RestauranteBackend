const Comida = require('../models/Comidas')
const fs = require('fs');
const ActualizarImagen = async (id,path,nombreArchivo)=>{

    const eliminarArchivo = (pathViejo)=>{

            if (fs.existsSync(pathViejo)){
                console.log(pathViejo)
                fs.unlinkSync(pathViejo);
            }

        }

    let pathViejo='';



    const comida = await Comida.findById(id);
        console.log(comida)
    if (!comida){
        console.log('No es un medico');
        return false;
    }

    pathViejo = `./uploads/imagenes/${comida.img}`;
   

    eliminarArchivo(pathViejo);
    

    comida.img = nombreArchivo;
    await comida.save();
    return true;

      
}

module.exports = {
    ActualizarImagen
}