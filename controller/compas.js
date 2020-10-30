
const Compra = require ('../models/compras')

const TraerCOmporas = async (req,res)=>{

    try {
        
            const compra  = await Compra.find({}).populate('usuario','nombre direccion email')
        
            return res.status(200).json({
                compra,
                mensaje:'hola'
        
            })
        
    } catch (error) {
        

        return res.status(500).json({
            status:false,
            mensaje:'Error',
            error
    
        })

    }

}

const GuardarCompra = async (req,res)=>{

    const body  = req.body;
    console.log(req._id);

    const compra = new  Compra({...req.body,usuario:req._id});

    try {
        const compras = await compra.save();
        res.status(200).json({
            status:true,
            mensaje:'Datos guardados',
            compra
    
        })

    } catch (error) {


        return res.status(500).json({
            status:false,
            mensaje:'Error',
            error
    
        })
        
    }

  

    
}

const ActualizarCompra = async (req,res)=>{
    const id = req.params.id;
    
    try {

        const Compraid = await Compra.findById(id);

        if (!Compraid){

            return res.status(400).json({
                status:false,
                mensaje:'El pedido no existe',
        
            });

        }

        console.log(Compraid.enviado)
        Compraid.enviado==true? Compraid.enviado=false:Compraid.enviado=true;
        console.log(Compraid.enviado)
        const compra = await Compra.findByIdAndUpdate(id,{enviado:Compraid.enviado});


        return res.status(200).json({
            status:true,
            mensaje:'Usuario actualizado',
            compra
    
        })

        
    } catch (error) {
        return res.status(500).json({
            status:false,
            mensaje:'Error',
            error
    
        })
    }




}

 const EliminarCompra  = async (req,res)=>{

    var id = req.params.id;
    console.log(id)
    try {
        
        const compra = await Compra.findByIdAndDelete(id);
        console.log(compra)
        return res.status(200).json({
            status:true,
            mensaje:'Usuario actualizado',
            compra
    
        })



    } catch (error) {
        return res.status(500).json({
            status:false,
            mensaje:'Error',
            error
    
        })
    }

 }

module.exports = {

    TraerCOmporas,
    GuardarCompra,
    ActualizarCompra,
    EliminarCompra 

}