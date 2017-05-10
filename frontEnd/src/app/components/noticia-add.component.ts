import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute,Params } from '@angular/router';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/users.service';
import {NoticiaService} from '../../services/noticia.service';

import {Noticia} from '../../Models/noticias';
//import {FieldService} from '../../services/noticia.service';



@Component({
	selector: 'noticia-add',
	templateUrl: '../views/noticia-add.html',
	providers:[UserService,NoticiaService]
})


export class NoticiaAddComponent implements OnInit{
	public titulo: string;
	public noticia: Noticia;
	public identity;
	public token;
	public url:string;
	public alertMessage;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _noticiaService:NoticiaService
	){
		this.titulo = 'Crear Noticias';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;	
		this.noticia = new Noticia('','','','');
		

	}

	ngOnInit(){
		console.log('Creado de noticias funcionando');

		//lista de canchas
	}
	onSubmit(){
		console.log(this.noticia);
		this._noticiaService.addNoticia(this.token,this.noticia).subscribe(
			response =>{
				
				if(!response.noticia){
					this.alertMessage="error en el servidor";
				}else{
					this.alertMessage="Se creo correctamente";
					this.noticia = response.noticia;
					this._router.navigate(['/edit-noticia',response.noticia._id]);
				}
			},
			error => {
				var errorMessage = <any>error;
				
				if(errorMessage != null) {
					var body = JSON.parse(error._body);
					this.alertMessage = body.message;
					console.log(error);
				}
			}


		);
	}


}