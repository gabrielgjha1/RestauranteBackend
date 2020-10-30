const express = require('express');
const {TraerUsuarios,GuardarUsuaurio,ActualizarUsuario,EliminarUsuario} = require('../controller/usuario');
const { validarJWT,validarAdminRol } = require('../middleware/validar-jwt');
const router = express.Router();

router.get('/', validarJWT ,validarAdminRol, TraerUsuarios  );

router.post('/',GuardarUsuaurio  );
router.put('/:id',validarJWT,validarAdminRol,ActualizarUsuario);
router.delete('/:id',validarJWT,validarAdminRol,EliminarUsuario);


module.exports = router;