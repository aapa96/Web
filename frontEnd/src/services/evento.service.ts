import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Evento} from '../Models/eventos';




@Injectable()
export class EventoService{
	public url: string;
	
	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	getEventos(token,page){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({headers:headers});
		return this._http.get(this.url+'getEventos/'+page,options).map(res => res.json());
	}

	getEvento(token,id: string){

		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});
		let options = new RequestOptions({headers:headers});
		return this._http.get(this.url+'getEvento/'+id,options).map(res=> res.json());
	}

 

	addEvento(token,evento:Evento){
		let params = JSON.stringify(evento);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});
		return this._http.post(this.url+'saveEvento',params,{headers: headers})
		.map(res=> res.json());
	}
 
}	