'use strict'

var express = require('express');
var UserController = require('../controllers/users');



var api = express.Router();

api.get('/ControladorU',UserController.pruebas);
api.post('/register',UserController.saveUser);
api.post('/loginUser',UserController.loginUser);





module.exports=api;