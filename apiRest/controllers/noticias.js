
'use strict'
var path = require('path');
var fs = require('fs');
var Noticia = require('../models/noticias');
var mongoosePaginate = require('mongoose-pagination');

function pruebas(req,res){
	res.status(200).send({message:'API NOTICIAS LISTA'});
}



function getNoticia(req,res){
	var noticiaId = req.params.id;
	Noticia.findById(noticiaId,(err,noticia) =>{
		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!noticia){
				res.status(404).send({message:'La noticia no existe'});
			}else{
				res.status(200).send({noticia});
			}
		}
	});
}

function getNoticias(req,res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}
	
	var itemsPerPage =3;
	Noticia.find().sort('name').paginate(page, itemsPerPage, function(err,noticias,total){

		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!noticias){
				res.status(404).send({message:'No hay establecimientos'});
			}else{
				return res.status(200).send({
					pages: total,
					noticias: noticias
				});
			}
		}

	});


}

function saveNoticia(req,res){
	var noticia = new Noticia();
	var params = req.body;
	noticia.name = params.name;
	noticia.subtitle = params.subtitle;
	noticia.image ='null';
	noticia.description=params.description;
	noticia.save((err,noticiaStored) =>{
		if(err){
			res.status(500).send({message:'Error al guardar la noticia'});
		}else{
			if(!noticiaStored){
				res.status(404).send({message:'La noticia no ha sido guardado'});
			}else{
				res.status(200).send({noticia:noticiaStored});
			}
		}

	});
}

function updateNoticia(req,res){
	var noticiaId = req.params.id;
	var update = req.body;
	Noticia.findByIdAndUpdate(noticiaId,update,(err,noticiaUpdated) =>{
		if(err){
			res.status(500).send({message:"Erro al guardar la noticia"});
		}else{
			if(!noticiaUpdated){
				res.status(404).send({message:"La noticia no se actualizo"});
			}else{
				res.status(200).send({noticia:noticiaUpdated});
			}
		}
	})
}


function deleteNoticia(req,res){
	var noticiaId = req.params.id;
	
	Noticia.findByIdAndRemove(noticiaId,(err,noticiaRemoved) =>{
		if(err){
			res.status(500).send({message:"Error al eliminar"});
		}else{
			if(!noticiaRemoved){
				res.status(404).send({message:"La noticia no ha sido eliminado"});
			}else{
				res.status(200).send({noticiaRemoved});
			}
		}
	});
}

function uploadImage(req,res){
	var noticiaId = req.params.id;
	var file_name = 'No subido...';
	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
			Noticia.findByIdAndUpdate(noticiaId,{image:file_name},(err,noticiaUpdated) =>{
				if(!noticiaId){
				res.status(404).send({message:'No se ha podido actualizar la noticia'});
				}else{
					res.status(200).send({noticia: noticiaUpdated});
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
	var path_file = './upload/notices/'+imageFile;

	fs.exists(path_file,function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else {

			res.status(404).send({message:'No existe la imagen'});
		}
	});
}



module.exports  = {
	pruebas,
	saveNoticia,
	getNoticia,
	getNoticias,
	updateNoticia,
	deleteNoticia,
	uploadImage,
	getImageFile
};