import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { config } from '../config';

@Injectable()
export class LocationChangeService {
	
	config = config;

	constructor(private http:Http) { }

ngOnInit() {
}

	//method is used to hit api on express server and post the data of form in database
	locationChangeMethod(change:any){
		return this.http
		.post(this.config.connect.url+this.config.connect.port+'/locationchange/'+'locationInsert',change)
		.map(res=>res.json());
	}

	//method is used to hit api on express server and get the location change data from database
	getLocationChange()
	{
		return this.http
		.get(this.config.connect.url+this.config.connect.port+'/locationchange/'+'findlocation')
		.map(res=>res.json());
	}

			//Get data from mssql database using employee id
  getEmpSql(employeeID) {
    return this.http
    .get(this.config.connect.url+this.config.connect.port+'/locationchange/'+'getData/' + employeeID)
    .map(res => res.json());
  }

  /*update method used in supervisor component*/
  update(id, employee) {
    console.log(employee)
    return this.http
    .put(this.config.connect.url+this.config.connect.port+'/locationchange/'+'update/' + id, employee)
    .map(res => res.json());

 }
  
 /*getEmployeeByID method to fetch details by id used in supervisor component*/
  getEmployeeByID(employeeID) {
    return this.http
    .get(this.config.connect.url+this.config.connect.port+'/requester/'+'findemployeebyid/' + employeeID)
    .map(res => res.json());
  }

  //Angular Service of get method of employee
  getEmployee() {
    return this.http
    .get(this.config.connect.url+this.config.connect.port+'/requester/'+'findemployee')
    .map(res => res.json());
  }
}