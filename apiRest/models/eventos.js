'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventoSchema = Schema({
	name: String,
	empresa: String,
	description: String,
	email:String,
	phone:String
})


module.exports = mongoose.model('Evento',EventoSchema);
