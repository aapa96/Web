import {Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Field} from '../Models/fields';




@Injectable()
export class FieldService{
	public url: string;
	
	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	addField(token,field:Field){
		let params = JSON.stringify(field);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});
		return this._http.post(this.url+'save',params,{headers: headers})
		.map(res=> res.json());
	}
}	