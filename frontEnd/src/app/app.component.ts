import { Component } from '@angular/core';
import {User} from '../Models/users';
import {UserService} from '../services/users.service';
import {Router, ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UserService]
  
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'SoccerFields';
	public user: User;
	public user_register: User;
	public identity;
	public token; 
	public errorMessage;
	public alertRegister;
	public inscribe;
	public registre;


	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService
		){
		this.user = new User ('','','','','','','','ROLE_USER');
		this.user_register = new User ('','','','','','','','ROLE_USER');
		this.inscribe = false;
		this.registre = false;
	}

	ngOnInit(){
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	onInscribe(){
		this.inscribe = true;
		this.registre = false;
	}

	onRegister(){
		this.inscribe = false;
		this.registre = true;
	}

	public onSubmit(){	
		console.log(this.user);
	
		//conseguir datos de  usuario

		this._userService.signup(this.user).subscribe(
			response => {
				let identity= response.user;
				this.identity = identity;
				if(!this.identity._id) {
					alert("El usuario no esta correctamente identificado");

				}else{
					//Crear elemento en el localstorage
					localStorage.setItem('identity',JSON.stringify(identity));
					// conseguir el token para mandarselo a cada peticion http
					this._userService.signup(this.user, 'true').subscribe(
							response => {
								let token= response.token;
								this.token = token;
								if(this.token.length <= 0) {
									alert("El token no se ha generado");

								}else{
									//Crear elemento en el localstorage para tener token
									localStorage.setItem('token',token);
									this.user = new User ('','','','','','','','ROLE_USER');						
								}

							},
							error => {
								var errorMessage = <any>error;
								
								if(errorMessage != null) {
									var body = JSON.parse(error._body);
									this.errorMessage = body.message;
									console.log(error);
								}
							}
					);
				}



			},
			error => {
				var errorMessage = <any>error;
				
				if(errorMessage != null) {
					var body = JSON.parse(error._body);
					this.errorMessage = body.message;
					console.log(error);
				}
			}
		);
	}



	logout(){
		localStorage.removeItem('identity');
		localStorage.removeItem('token');
		localStorage.clear();
		this.identity = null;
		this.token = null;
		this._router.navigate(['/']);
	}

	onSubmitRegister(){

		console.log(this.user_register);

		this._userService.register(this.user_register).subscribe(
			response => {
				let user = response.user;
				this.user_register = user;

				if(!user._id){
					this.alertRegister= 'Error al registrarse';
				}else{
					this.alertRegister = "El registro se ha realizado correctamente, identificate con " + this.user_register.email;
					this.user_register = new User ('','','','','','','','ROLE_USER');
				}
			},
			error => {
				var errorMessage = <any>error;
				
				if(errorMessage != null) {
					var body = JSON.parse(error._body);
					this.alertRegister = body.message;
					console.log(error);
				}
			}



		);
	}



}
