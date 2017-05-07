import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute,Params } from '@angular/router';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/users.service';

import {Field} from '../../Models/fields';

@Component({
	selector: 'field-list',
	templateUrl: '../views/field-list.html',
	providers:[UserService]
})


export class FieldListComponent implements OnInit{
	public titulo: string;
	public fields: Field[];
	public identity;
	public token;
	public url:string;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService
	){
		this.titulo = 'Complejos';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;	
	}

	ngOnInit(){
		console.log('Lista de canchas funcionando');
		//lista de canchas
	}
}