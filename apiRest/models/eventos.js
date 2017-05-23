'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventosSchema = Schema({
	Nombre: String,
	Phone: String,
	description: String,
	email:String
})


module.exports = mongoose.model('Eventos',EventosSchema);
