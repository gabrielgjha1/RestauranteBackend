const Comidas = require('../models/Comidas')

const TraerComidas = async (req,res)=>{


    try {
        
        const comidas = await Comidas.find({},'nombre  contenido precio img');

        return res.status(200).json({

            status:true,
            mensaja:"Comidas registradas",
            comidas
        });

    } catch (error) {
        res.status(500).json({

            status:false,
            mensaja:"ERROR Al traer los datos",
            error
        });
    }

}


const GuardarComida = async (req,res)=>{
    const body = req.body;

    const comida = new Comidas({...req.body});

    try {
        
        const  comidas = await comida.save();

     return   res.status(200).json({

            status:true,
            mensaja:"comida guardada",
            comidas
        });

    } catch (error) {
         res.status(500).json({

            status:false,
            mensaja:"ERROR Al guardar la comida",
            error
        });
    }


}


const ActualizarCOmida = async (req,res)=>{

    const id = req.params.id;
    const body = req.body;
    try {
    
        const comidas = await Comidas.findByIdAndUpdate(id,body);

        if (!comidas){
           return res.status(400).json({

                status:false,
                mensaja:"La comida no existe",
                error
            });


        }

        return   res.status(200).json({

            status:true,
            mensaja:"comida Actualizada",
            comidas
        });

    } catch (error) {
        res.status(400).json({

            status:false,
            mensaja:"ERROR Al Actualizar la comida, No existe",
            error
        });
    }
}

const EliminarComida = async  (req,res)=>{
    const id = req.params.id;
    
    try {
        const comidas = await Comidas.findByIdAndDelete(id);
        if (!comidas){
            return res.status(400).json({
     
                 status:false,
                 mensaja:"La comida no existe",
                 error
             });
     
         }

         return   res.status(200).json({

            status:true,
            mensaja:"comida Actualizada",
            comidas
        });
    } catch (error) {

        res.status(400).json({

            status:false,
            mensaja:"La comida no existe",
            error
        });

    }
    

}



module.exports = {
    TraerComidas,
    GuardarComida,
    ActualizarCOmida,
    EliminarComida
}