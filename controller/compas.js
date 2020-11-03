
const Compra = require ('../models/compras');
const nodemailer = require("nodemailer");
const { findOne, find } = require('../models/compras')

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

        const Compraid = await Compra.findById(id).populate('usuario');

        if (!Compraid){

            return res.status(400).json({
                status:false,
                mensaje:'El pedido no existe',
        
            });

        }


        Compraid.enviado==true? Compraid.enviado=false:Compraid.enviado=true;
   
        const compra = await Compra.findByIdAndUpdate(id,{enviado:Compraid.enviado});
        console.log(Compraid.usuario.email)
        
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'restauranteprogg@gmail.com', // generated ethereal user
                pass: 'Gabriel123@', // generated ethereal password
            },
        });
        
        let info = await transporter.sendMail({
            from: 'Restauranteprueba1@gmail.com', // sender address
            to: Compraid.usuario.email, // list of receivers
            subject: "Enviado desde node mailer", // Subject line
            text: "Hola mundo?", // plain text body
            html: `
            <h1>Su pedido a sido enviado :)</h1>
            <p>Pronto le llegara un mensaje cuando el pedido este llegando</p>
            `
        });
        
        console.log('hola');


        return res.status(200).json({
            status:true,
            mensaje:'Usuario actualizado',
            compra,
           
    
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
  

    try {
        
        const compra = await Compra.findByIdAndDelete(id);
  
        return res.status(200).json({
            status:true,
            mensaje:'Usuario actualizado',
            compra
    
        });



    } catch (error) {

        return res.status(500).json({
            status:false,
            mensaje:'Error',
            error
    
        });

    }

 }

 const PedidoUsuario = async (req,res)=>{
    const id = req.params.id;

    
    try {
        
        const compra  = await  Compra.find({usuario:id});
        
        return res.status(200).json({
            status:true,
            mensaje:'Usuario actualizado',
            compra
    
        });


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
    EliminarCompra,
    PedidoUsuario

}