'use strict'

var express = require('express');
var UserController = require('../controllers/users');
var md_auth = require('../middlewares/authenticated');


var api = express.Router();

api.get('/ControladorU',md_auth.ensureAuth,UserController.pruebas);
api.post('/register',UserController.saveUser);
api.post('/loginUser',UserController.loginUser);
api.put('/updateUser/:id',md_auth.ensureAuth,UserController.updateUser);

module.exports=api;