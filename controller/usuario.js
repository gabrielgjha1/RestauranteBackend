
const Usuario = require('../models/usuario');
var bcrypt = require('bcryptjs');
const { verify } = require('jsonwebtoken');
const TraerUsuarios =  async (req,res)=>{


    try {
        const usuarios = await Usuario.find({},'nombre email usuario rol');

        res.status(200).json({

            status:true,
            mensaje:"Usuarios",
            usuarios
            
        })
    } catch (error) {
        
        res.status(500).json({

            status:true,
            mensaje:"Error al listar los usuarios",
            error
            
        })

    }

}

const GuardarUsuaurio = async (req,res)=>{

    const body = req.body;

    try {

        const ComprobarEmail = await  Usuario.findOne({email:body.email});



        if (ComprobarEmail){

          return  res.status(400).json({

                status:false,
                mensaje:"EL Correo existe existe"

            })

        }

        const ComprobarUsuario = await  Usuario.findOne({usuario:body.usuario});

        if (ComprobarUsuario){

            return  res.status(400).json({
  
                  status:false,
                  mensaje:"EL Usuario existe existe"
  
              })
  
          }

    } catch (error) {
        
        return  res.status(500).json({
  
            status:false,
            mensaje:"Error al intentar comprobar los datos",
            error
        })

    }
    var salt = bcrypt.genSaltSync();
    var usuario = new Usuario(req.body);
    usuario.password = bcrypt.hashSync(req.body.password, salt);

    try{


        const UsuarioGuardado = await usuario.save();

        return  res.status(200).json({
  
            status:true,
            mensaje:"Datos guardados",
            usuario:UsuarioGuardado
      })

    } catch(error){

        return  res.status(500).json({
  
                    status:false,
                    mensaje:"Error al intentar comprobar los datos",
                    error
              })
        


    }

}

const ActualizarUsuario = async(req,res)=>{
    var id = req.params.id;
    var nuevoRol="";
    
    
    try {
        
        const VerROl = await Usuario.findById(id);
    
        if (!VerROl){
    
            return  res.status(400).json({
    
                status:false,
                mensaje:"EL Usuario no existe"
    
            });
        }
        
        console.log(VerROl.rol)
        VerROl.rol==='USER_ROLE'? nuevoRol='ADMIN_ROLE':nuevoRol='USER_ROLE'
        console.log(nuevoRol);
        const usuario = await Usuario.findByIdAndUpdate(id,{rol:nuevoRol});

        return  res.status(200).json({
  
            status:true,
            mensaje:"Datos Actualizados",
            usuario:usuario
      })


    } catch (error) {
        
        return  res.status(500).json({
  
            status:false,
            mensaje:"Error al intentar comprobar los datos",
            error
      })

    }

}

const EliminarUsuario = async (req,res)=>{
    var id = req.params.id;

    try {


        const usuario = await Usuario.findByIdAndDelete(id);
        
        if (!usuario){

            return  res.status(400).json({
    
                status:false,
                mensaje:"EL Usuario no existe"
    
            });

        }

        
        return  res.status(200).json({
  
            status:true,
            mensaje:"Datos Eliminados",
            usuario:usuario
      })
      
    } catch (error) {
        return  res.status(500).json({
  
            status:false,
            mensaje:"Error al intentar comprobar los datos",
            error
      })
    }


}

module.exports = {

    TraerUsuarios,
    GuardarUsuaurio,
    ActualizarUsuario,
    EliminarUsuario

}