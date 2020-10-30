const Usuario = require('../models/usuario');
var bcrypt = require('bcryptjs');
const  {generarJWT} = require('../helpers/jwt');
const Login = async(req,res)=>{
    const body = req.body;

    try {
        
        const ComprobarEmail = await Usuario.findOne({email:body.email});
        

        if (!ComprobarEmail){

            return  res.status(400).json({

                status:false,
                mensaje:"EL Correo  no existe existe"

            })
        }

      

        const ValidarPassword = bcrypt.compareSync(body.password,ComprobarEmail.password);
        console.log(ValidarPassword)
        if (!ValidarPassword){
            return  res.status(400).json({

                status:false,
                mensaje:"Contraseña Incorrecta",

            })
        }


        console.log('sad')
        const token =  await generarJWT(ComprobarEmail._id,ComprobarEmail );
          return res.status(200).json({
            status:true,
            mensaje:"LOgin con exito",
            usuario:ComprobarEmail,
            token
        })



    } catch (error) {
        return res.status(500).json({
            status:false,
            mensaje:"Error en el login",
            
            error
        })
    }
       

}

const renewToken = async (req,res)=>{
    

    
    const  id = req._id;


    const usuario = await Usuario.findById(id);
   
    
    res.status(200).json({
        status:true,     
        usuario,
    })


}


module.exports = {
    Login,
    renewToken
}