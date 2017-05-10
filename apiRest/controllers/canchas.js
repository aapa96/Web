
'use strict'
var path = require('path');
var fs = require('fs');

var Field = require('../models/canchas');
var mongoosePaginate = require('mongoose-pagination');

function pruebas(req,res){
	res.status(200).send({message:'Error en la asdsadasdasdsadsads'});
}

function getField(req,res){
	var fieldId = req.params.id;
	Field.findById(fieldId,(err,field) =>{
		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!field){
				res.status(404).send({message:'El establecimiento no existe'});
			}else{
				res.status(200).send({field});
			}
		}
	});
}



function getFields(req,res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}
	
	var itemsPerPage =8;
	Field.find().sort('name').paginate(page, itemsPerPage, function(err,fields,total){

		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!fields){
				res.status(404).send({message:'No hay establecimientos'});
			}else{
				return res.status(200).send({
					pages: total,
					fields: fields
				});
			}
		}

	});

}


function getFieldsDistrit(req,res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}
	
	var itemsPerPage = 4;
	Field.find().sort('distrit').paginate(page, itemsPerPage, function(err,fields,total){

		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!fields){
				res.status(404).send({message:'No hay establecimientos'});
			}else{
				return res.status(200).send({
					pages: total,
					fields: fields
				});
			}
		}

	});

}


function saveField(req,res){
	var field = new Field();
	var params = req.body;
	field.name = params.name;
	field.description = params.description;
	field.email = params.email;
	field.image ='null';
	field.distrit=params.distrit;
	field.save((err,fiedlStored) =>{
		
		if(err){
			res.status(500).send({message:'Error al guardar el establecimiento'});
		}else{
			if(!fiedlStored){
				res.status(404).send({message:'El establecimiento no ha sido guardado'});
			}else{
				res.status(200).send({field:fiedlStored});
			}
		}

	});
}

function updateField(req,res){
	var fieldId = req.params.id;
	var update = req.body;
	Field.findByIdAndUpdate(fieldId,update,(err,fieldUpdated) =>{
		if(err){
			res.status(500).send({message:"Erro al guardar el establecimiento"});
		}else{
			if(!fieldUpdated){
				res.status(404).send({message:"El establecimiento no se actualizo"});
			}else{
				res.status(200).send({field:fieldUpdated});
			}
		}
	})
}


function deleteField(req,res){
	var fieldId = req.params.id;
	
	Field.findByIdAndRemove(fieldId,(err,fieldRemoved) =>{
		if(err){
			res.status(500).send({message:"Error al eliminar"});
		}else{
			if(!fieldRemoved){
				res.status(404).send({message:"El establecimiento no ha sido eliminado"});
			}else{
				res.status(200).send({fieldRemoved});
			}
		}
	});
}

function uploadImage(req,res){
	var fieldId = req.params.id;
	var file_name = 'No subido...';
	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
			Field.findByIdAndUpdate(fieldId,{image:file_name},(err,fieldUpdated) =>{
				if(!fieldUpdated){
				res.status(404).send({message:'No se ha podido actualizar el <establecimiento></establecimiento>'});
				}else{
					res.status(200).send({field: fieldUpdated});
				}
			});
		}else{
			res.status(200).send({message:'Extencion del archivo no valida'});
		}

		console.log(file_split);
	}else{
		res.status(200).send({message:'No se ha subido ninguna imagen...'});
}}



function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './upload/fields/'+imageFile;

	fs.exists(path_file,function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else {

			res.status(404).send({message:'No existe la imagen'});
		}
	});
}

module.exports  = {
	getField,
	pruebas,
	getFields,
	saveField,
	updateField,
	deleteField,
	uploadImage,
	getImageFile,
	getFieldsDistrit
};