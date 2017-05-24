'use strict'

var express = require('express');
var EventoController = require('../controllers/eventos');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();
var multipart = require('connect-multiparty');
 
api.get('/controladorn',EventoController.pruebas);
api.get('/getEvento/:id',md_auth.ensureAuth,EventoController.getEvento);
api.get('/getEventos/:page?',md_auth.ensureAuth,EventoController.getEventos);

api.post('/saveEvento',md_auth.ensureAuth,EventoController.saveEvento);
   

 



module.exports = api;
