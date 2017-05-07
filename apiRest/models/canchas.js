'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FieldSchema = Schema({
	name: String,
	description: String,
	email: String,
	image:String
})


module.exports = mongoose.model('Field',FieldSchema);
