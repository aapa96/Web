import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute,Params } from '@angular/router';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/users.service';
import {NoticiaService} from '../../services/noticia.service';
import {UploadService} from '../../services/upload.service';
 
import {Noticia} from '../../Models/noticias';

@Component({
	selector: 'noticia-edit',
	templateUrl: '../views/noticia-add.html',
	providers:[UserService,NoticiaService,UploadService]
})


export class NoticiadEditComponent implements OnInit{
	public titulo: string;
	public noticia: Noticia;
	public identity;
	public token;
	public url:string;
	public alertMessage;
	public is_edit;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _noticiaService:NoticiaService,
		private _uploadService:UploadService
	){
		this.titulo = 'Editar Noticia';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;	
		this.noticia = new Noticia('','','','');
		this.is_edit = true;
	}

	ngOnInit(){
		console.log('Editar canchas funcionando');
		//llamar al metodo del api para sacar una cancha en base al id
		this.getNoticia();
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

	onSubmit(){
		console.log(this.noticia);
		this._route.params.forEach((params: Params) =>{
			let id = params['id'];

			this._noticiaService.editNoticia(this.token,id,this.noticia).subscribe(
				response =>{
					
					if(!response.noticia){
						this.alertMessage="error en el servidor";
					}else{
						this.alertMessage="Se actualizo correctamente";
						this._uploadService.makeFileRequest(this.url+'uploadimageNoticia/'+id,[], this.filesToUpload,this.token,'image').then(
							(result) => {
						
								this._router.navigate(['/noticias',1]);
								
								
							},
							(error) =>{
								console.log(error);
							}
						);

					 
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
		});
	}

	
	public filesToUpload: Array<File>;

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}