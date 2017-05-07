'use strict'

var express = require('express');
var UserController = require('../controllers/users');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();

api.get('/ControladorU',UserController.pruebas);
api.post('/register',UserController.saveUser);
api.post('/login',UserController.loginUser);
api.put('/update/:id',md_auth.ensureAuth,UserController.updateUser);

module.exports=api;