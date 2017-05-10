'use strict'

var express = require('express');
var NoticiaController = require('../controllers/noticias');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./upload/notices'});

api.get('/controladorn',NoticiaController.pruebas);
api.get('/getNoticia/:id',md_auth.ensureAuth,NoticiaController.getNoticia);
api.get('/getNoticias/:page?',md_auth.ensureAuth,NoticiaController.getNoticias);

api.post('/saveNoticia',md_auth.ensureAuth,NoticiaController.saveNoticia);
   

api.put('/updateNoticia/:id',md_auth.ensureAuth,NoticiaController.updateNoticia);
api.delete('/deleteNoticia/:id',md_auth.ensureAuth,NoticiaController.deleteNoticia);

api.post('/uploadimageNoticia/:id',[md_auth.ensureAuth,md_upload],NoticiaController.uploadImage);
api.get('/get-image-Noticia/:imageFile',NoticiaController.getImageFile);






module.exports = api;
