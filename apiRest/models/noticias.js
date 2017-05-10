'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NoticiaSchema = Schema({
	name: String,
	subtitle: String,
	description: String,
	image:String
})


module.exports = mongoose.model('Noticia',NoticiaSchema);
