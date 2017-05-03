import { Component, OnInit } from '@angular/core';
import {User} from '../Models/users';
import {UserService} from '../services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UserService]
  //styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	public title = 'app works!';
	public user: User;
	public identity = true;
	public token; 

	constructor(
		private _userService:UserService
		){
		this.user = new User ('','','','','','','','ROLE_USER');
	}

	ngOnInit(){
		var texto = this._userService.signup();
		console.log(texto);
	}
	public onSubmit(){
		console.log(this.user);
	}

}
