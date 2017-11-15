import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from '../config';

@Injectable()
export class ThirdPartyService {

config = config;
  
constructor(private http: Http) { }

  ngOnInit() {
}

//to insert the values from database

thirdPartyInsert(thirdparty){

     return this.http

             .post(this.config.connect.url+this.config.connect.port+'/thirdparty/'+'thirdInsert',thirdparty)

            // .map(res=>res.json());

}
//Method is use to hit api of express server and to retrieve detail of third partuy
getThird()
{
	return this.http
	            .get(this.config.connect.url+this.config.connect.port+'/thirdparty/'+'findthird')
	            .map(res=>res.json());
}

}

