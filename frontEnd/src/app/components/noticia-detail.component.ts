import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute,Params } from '@angular/router';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/users.service';
import {NoticiaService} from '../../services/noticia.service';

import {Noticia} from '../../Models/noticias';

@Component({
	selector: 'noticia-detail',
	templateUrl: '../views/noticia-detail.html',
	providers:[UserService,NoticiaService]
})


export class NoticiaDetailComponent implements OnInit{

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

		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;	
		
	}

	ngOnInit(){
		console.log('Editar canchas funcionando');
		//llamar al metodo del api para sacar una cancha en base al id
		this.getNoticia	();
	}

	getNoticia(){
		this._route.params.forEach((params: Params) =>{
			let id = params['id'];
			this._noticiaService.getNoticia(this.token,id).subscribe(
				response =>{

					if(!response.noticia){
						this._router.navigate(['/']);
					}else{
						this.noticia = response.noticia;
					}
				},
				error => {
					var errorMessage = <any>error;
				
					if(errorMessage != null) {
						var body = JSON.parse(error._body);
						//this.alertMessage = body.message;
						console.log(error);
					}
				}
			);
		});
	}

	
}