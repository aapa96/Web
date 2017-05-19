import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute,Params } from '@angular/router';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/users.service';
import {Noticia} from '../../Models/noticias';
import {NoticiaService} from '../../services/noticia.service';



@Component({
	selector: 'noticia-list',
	templateUrl: '../views/noticia-list.html',
	providers:[UserService,NoticiaService]
})


export class NoticiaListComponent implements OnInit{
	public titulo: string;
	public noticias: Noticia[];
	public identity;
	public token;
	public url:string;
	public nextpage;
	public prevpage;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _noticiaService:NoticiaService
	){
		this.titulo = 'Noticias';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;	
		this.nextpage=1;
		this.prevpage=1;

	}

	ngOnInit(){
		console.log('Lista de noticias funcionando');
		//lista de canchas
		this.getNoticias();
	}

	getNoticias(){
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


			this._noticiaService.getNoticias(this.token,page).subscribe(
					response =>{

						if(!response.noticias){
							this._router.navigate(['/']);
						}else{
							this.noticias = response.noticias;
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
	OnDeleteOk(id){
		this._noticiaService.deleteNoticia(this.token,id).subscribe(
			response =>{

				if(!response.fields){
					this._router.navigate(['/noticias/1']);
				}else{
					this.getNoticias();
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
	}

}