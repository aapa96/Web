import { Component } from '@angular/core';
import {User} from '../Models/users';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
	public title = 'app works!';
	public user: User;
	public identity = true;
	public token; 

	constructor(){
		this.user = new User ('','','','','','','','ROLE_USER');
	}


	public onSubmit(){
		console.log(this.user);
	}

}
