import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute,Params } from '@angular/router';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/users.service';
import {Evento} from '../../Models/eventos';
import {EventoService} from '../../services/evento.service';



@Component({
	selector: 'eventos-list',
	templateUrl: '../views/eventos-list.html',
	providers:[UserService,EventoService]
})


export class EventoListComponent implements OnInit{
	public titulo: string;
	public eventos: Evento[];
	public identity;
	public token;
	public url:string;
	public nextpage;
	public prevpage;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _eventoService:EventoService
	){
		this.titulo = 'Eventos';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;	
		this.nextpage=1;
		this.prevpage=1;

	}

	ngOnInit(){
		console.log('Lista de eventos funcionando');
		//lista de canchas
		this.getEventos();
	}

	getEventos(){
		this._route.params.forEach((params:Params) =>{
			let page = +params['page'];
			if(!page){
				page == 1;
			}else{
				this.nextpage = page+1;
				this.prevpage = page-1;
				if(this.prevpage == 0){
					this.prevpage =1;
				}
			}


			this._eventoService.getEventos(this.token,page).subscribe(
					response =>{

						if(!response.eventos){
							this._router.navigate(['/']);
						}else{
							this.eventos = response.eventos;
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

				)

		});
	}
	 
}