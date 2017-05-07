import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute,Params } from '@angular/router';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/users.service';
import {FieldService} from '../../services/field.service';

import {Field} from '../../Models/fields';

@Component({
	selector: 'field-detail',
	templateUrl: '../views/field-detail.html',
	providers:[UserService,FieldService]
})


export class FieldDetailComponent implements OnInit{

	public field: Field;
	public identity;
	public token;
	public url:string;
	public alertMessage;
	
	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _fieldService:FieldService,
	
	){

		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;	
		
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

	
}