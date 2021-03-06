const app = require('express');
const route = app.Router();
const {TraerCOmporas,GuardarCompra,ActualizarCompra,EliminarCompra,PedidoUsuario} = require('../controller/compas');
const { validarJWT,validarAdminRol } = require('../middleware/validar-jwt');
route.get('/',validarJWT,validarAdminRol,TraerCOmporas);
route.post('/',validarJWT,GuardarCompra);
route.put('/:id',validarJWT,validarAdminRol,ActualizarCompra);
route.delete('/:id',validarJWT,validarAdminRol,EliminarCompra);
route.get('/usuario/:id',PedidoUsuario)
module.exports =route;