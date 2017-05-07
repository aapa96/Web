import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute,Params } from '@angular/router';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/users.service';
import {Field} from '../../Models/fields';
import {FieldService} from '../../services/field.service';
@Component({
	selector: 'field-list',
	templateUrl: '../views/field-list.html',
	providers:[UserService,FieldService]
})


export class FieldListComponent implements OnInit{
	public titulo: string;
	public fields: Field[];
	public identity;
	public token;
	public url:string;
	public nextpage;
	public prevpage;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _fieldService:FieldService
	){
		this.titulo = 'Complejos';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;	
		this.nextpage=1;
		this.prevpage=1;

	}

	ngOnInit(){
		console.log('Lista de canchas funcionando');
		//lista de canchas
		this.getFields();
	}

	getFields(){
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


			this._fieldService.getFields(this.token,page).subscribe(
					response =>{

						if(!response.fields){
							this._router.navigate(['/']);
						}else{
							this.fields = response.fields;
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