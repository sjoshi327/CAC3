import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from '../config';

@Injectable()
export class DamagedCardService {

	config = config;

	constructor(public http:Http) { }

	//method for inserting data of form to database in server side
	damage(request){
		return this.http
		.post(this.config.connect.url+this.config.connect.port+'/damage/'+'damageInsert',request)
		.map(res => res.json());
	}

	// method for getting damage data from api in server side
	getDamageCard()
	{
		return this.http
		.get(this.config.connect.url+this.config.connect.port+'/damage/'+'finddamage')
		.map(res=>res.json());
	}
}
