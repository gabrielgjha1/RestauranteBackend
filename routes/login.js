const express = require('express');
const routes = express.Router();
const {Login,renewToken} = require('../controller/login');
const { validarJWT,validarAdminRol } = require('../middleware/validar-jwt');
routes.post('/',Login);
routes.get('/',validarJWT,renewToken);
routes.get('/admin',validarJWT,validarAdminRol,renewToken);

module.exports = routes;