const express = require('express');

const fileUpload = require('express-fileupload');
const Router = express.Router();
const {GuardarImagen,RetornarImagen} = require('../controller/uploads');

    Router.use(fileUpload());
    Router.put('/:id',GuardarImagen)
    Router.get('/:foto',RetornarImagen)

module.exports = Router;