'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/users');
var jwt = require('../services/jwt');
function pruebas(req,res){
	res.status(200).send({
		message:"Controlador de usuario listo"
	});
}

function saveUser(req,res){
	var user = User();
	var params = req.body;
	console.log(params);

	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.birthday = 'null';
	user.phone = params.phone;
	user.role = 'ROLE_ADMIN';

 	if(params.password){
		//encriptar contrase;a
		bcrypt.hash(params.password,null,null,function(err,hash){
			user.password = hash;
			if (user.name != null && user.surname != null && user.email != null && user.phone != null) {
				// Guardar Usuario
				user.save((err,userStored)=>{
					if (err) {
						// statement
						res.status(500).send({message:"Error al guardar usuario"});
					} else {
						// statement
						if (!userStored) {
							res.status(404).send({message:"No se ha registrado el usuario"});
						} else {
							res.status(200).send({user: userStored});
						}
					}
				});
			} else {
				res.status(200).send({message:"Introduce todos los campos"});
			}
		});
	}else{
		res.status(200).send({message:"Introduce la contrasena"});
	}
}


function loginUser(req,res){
	var params = req.body;
	var email = params.email;
	var password = params.password;

	User.findOne({email:email.toLowerCase()},(err,user) =>{
		if (err) {
			// statement
			res.status(500).send({message:"Error en la peticion"});
		} else {
			// statement
			if (!user) {
				// statement
				res.status(404).send({message:"El usuario no existe"});
			} else {
				// Comprobar contrasea
				bcrypt.compare(password,user.password,function(err,check){
					if(check){
						//devolve datos de usuario logueado
						if(params.gethash){
							//devolver token con datos de usuario gracias a jwt
							res.status(200).send({
								token:jwt.createToken(user)
							});
						}else{
							res.status(200).send({user});
						}
					}else{
						res.status(404).send({message:"Usuario no ha podido loguearse"});
					}
				});
			}
		}
	});
}

function updateUser (req,res) {
	var userId = req.params.id;
	var update = req.body;
	User.findByIdAndUpdate(userId,update,(err,userUpdated) =>{
		if (err) {
			res.status(500).send({message:"Error al actualizar usuario"});
		} else { 
			if (!userUpdated) {
				res.status(404).send({message:"No se ha podido actualizar el usuario"});
			} else {
				res.status(200).send({user:userUpdated});
			}
		}
	});
}


module.exports = {

	pruebas,
	saveUser,
	loginUser,
	updateUser

};