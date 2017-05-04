import { Component } from '@angular/core';
import {User} from '../Models/users';
import {UserService} from '../services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UserService]
  
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Soccer Field!';
	public user: User;
	public identity = true;
	public token; 

	constructor(
		private _userService:UserService
		){
		this.user = new User ('','','','','','','','ROLE_USER');
	}

	ngOnInit(){
		
	}

	public onSubmit(){	
		console.log(this.user);

		this._userService.signup(this.user).subscribe(
			response => {
				console.log(response);
			},
			error => {
				var errorMessage = <any>error;
				
				if(errorMessage != null) {
					console.log(error);
				}
			}
		);
	}
}
