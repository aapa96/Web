'use strict'

var express = require('express');
var FieldController = require('../controllers/canchas');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./upload/fields'});

api.get('/field/:id',md_auth.ensureAuth,FieldController.getField);
api.get('/fields/:page?',md_auth.ensureAuth,FieldController.getFields);
api.get('/fields/:distrit',md_auth.ensureAuth,FieldController.getFieldsDistrit);

api.post('/save',md_auth.ensureAuth,FieldController.saveField);


api.put('/updateField/:id',md_auth.ensureAuth,FieldController.updateField);
api.delete('/removeField/:id',md_auth.ensureAuth,FieldController.deleteField);

api.post('/uploadimageField/:id',[md_auth.ensureAuth,md_upload],FieldController.uploadImage);
api.get('/get-image-Field/:imageFile',FieldController.getImageFile);


module.exports = api;
