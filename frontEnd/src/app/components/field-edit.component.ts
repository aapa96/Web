import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute,Params } from '@angular/router';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/users.service';
import {FieldService} from '../../services/field.service';
import {UploadService} from '../../services/upload.service';

import {Field} from '../../Models/fields';

@Component({
	selector: 'field-edit',
	templateUrl: '../views/field-add.html',
	providers:[UserService,FieldService,UploadService]
})


export class FieldEditComponent implements OnInit{
	public titulo: string;
	public field: Field;
	public identity;
	public token;
	public url:string;
	public alertMessage;
	public is_edit;
	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _fieldService:FieldService,
		private _uploadService:UploadService
	){
		this.titulo = 'Editar complejo';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;	
		this.field = new Field('','','','');
		this.is_edit = true;
	}

	ngOnInit(){
		console.log('Editar canchas funcionando');
		//llamar al metodo del api para sacar una cancha en base al id
		this.getField();
	}

	getField(){
		this._route.params.forEach((params: Params) =>{
			let id = params['id'];
			this._fieldService.getField(this.token,id).subscribe(
				response =>{

					if(!response.field){
						this._router.navigate(['/']);
					}else{
						this.field = response.field;
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
		console.log(this.field);
		this._route.params.forEach((params: Params) =>{
			let id = params['id'];

			this._fieldService.editField(this.token,id,this.field).subscribe(
				response =>{
					
					if(!response.field){
						this.alertMessage="error en el servidor";
					}else{
						this.alertMessage="Se actualizo correctamente correctamente";
						//subir la imagen de la cancha
						this._uploadService.makeFileRequest(this.url+'uploadimageField/'+id,[], this.filesToUpload,this.token,'image').then(

							(result) => {
						
									this._router.navigate(['/fields',1]);
								
								
							},
							(error) =>{
								console.log(error);
							}
						);
						//this.field = response.field;
						//this._router.navigate(['/edit-field'],response.field._id);
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