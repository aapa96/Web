import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute,Params } from '@angular/router';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/users.service';
import {EventoService} from '../../services/evento.service';

import {Evento} from '../../Models/eventos';
//import {FieldService} from '../../services/noticia.service';



@Component({
	selector: 'eventos-add',
	templateUrl: '../views/eventos-add.html',
	providers:[UserService,EventoService]
})


export class EventoAddComponent implements OnInit{
	public titulo: string;
	public evento: Evento;
	public identity;
	public token;
	public url:string;
	public alertMessage;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _eventoService:EventoService
	){
		this.titulo = 'Crear Evento';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;	
		this.evento = new Evento('','','','','');
		

	}

	ngOnInit(){
		console.log('Creado de eventos funcionando');

		//lista de canchas
	}
	onSubmit(){
		
		this._eventoService.addEvento(this.token,this.evento).subscribe(
			response =>{
				
				if(!response.evento){
					//this.alertMessage="error en el servidor";
					this._router.navigate(['/']);
				}else{
					//this.alertMessage="Se creo correctamente";
					this.evento = response.evento;
					this._router.navigate(['/']);
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