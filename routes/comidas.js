const express = require('express');
const Router = express.Router();
const {TraerComidas,GuardarComida, ActualizarCOmida,EliminarComida} = require('../controller/comidas');
const { validarJWT,validarAdminRol } = require('../middleware/validar-jwt');
Router.get('/',TraerComidas);
Router.post('/',validarJWT,validarAdminRol,GuardarComida);
Router.put('/:id', ActualizarCOmida);
Router.delete('/:id',EliminarComida)

module.exports = Router;
