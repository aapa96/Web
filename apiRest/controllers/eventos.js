
'use strict'
var path = require('path');
var fs = require('fs');
var Evento = require('../models/eventos');
var mongoosePaginate = require('mongoose-pagination');

function pruebas(req,res){
	res.status(200).send({message:'API eventos LISTA'});
}



function getEvento(req,res){
	var eventoId = req.params.id;
	Evento.findById(eventoId,(err,evento) =>{
		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!evento){
				res.status(404).send({message:'el evento no existe'});
			}else{
				res.status(200).send({evento});
			}
		}
	});
}
 
function getEventos(req,res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}
	
	var itemsPerPage =20;
	Evento.find().sort('name').paginate(page, itemsPerPage, function(err,eventos,total){

		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!eventos){
				res.status(404).send({message:'No hay evento'});
			}else{
				return res.status(200).send({
					pages: total,
					eventos: eventos
				});
			}
		}

	});


}

function saveEvento(req,res){
	var eventos = new Evento();
	var params = req.body;
	eventos.name = params.name;
	eventos.empresa = params.empresa;
	eventos.description=params.description;
	eventos.email=params.email;
	eventos.phone=params.phone;

	eventos.save((err,eventoStored) =>{
		if(err){
			res.status(500).send({message:'Error al guardar la eventos'});
		}else{
			if(!eventoStored){
				res.status(404).send({message:'La eventos no ha sido guardado'});
			}else{
				res.status(200).send({eventos:eventoStored});
			}
		}

	});
}




module.exports  = {
	pruebas,
	saveEvento,
	getEvento,
	getEventos
};