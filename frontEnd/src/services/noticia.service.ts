import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Noticia} from '../Models/noticias';


@Injectable()
export class NoticiaService{
	public url: string;
	
	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	addNoticia(token,noticia:Noticia){
		let params = JSON.stringify(noticia);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		})

		return this._http.post(this.url+'saveNoticia',params,{headers:headers})
						.map(res => res.json());
	}


	getNoticias(token,page){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({headers:headers});
		return this._http.get(this.url+'getNoticias/'+page,options).map(res => res.json());
	}

	getNoticia(token,id: string){

		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});
		let options = new RequestOptions({headers:headers});
		return this._http.get(this.url+'getNoticia/'+id,options).map(res=> res.json());
	}


	editNoticia(token,id:string,noticia:Noticia){
		let params = JSON.stringify(noticia);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.put(this.url+'updateNoticia/'+id,params,{headers: headers})
		.map(res=> res.json());
	}

	deleteNoticia(token,id: string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});
		let options = new RequestOptions({headers:headers});
		return this._http.delete(this.url+'deleteNoticia/'+id,options).map(res=> res.json());
	}

}	