import { Injectable } from '@angular/core';
import { config } from '../config';
import { Http ,RequestOptions ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
config = config;
role = null;
  constructor(private http: Http) { }

  getRole(id) {
     this.getCsoRole(id)
     .subscribe(res=>{
       console.log(res)
       if(res!=null)
         this.role = "cso";
     })

     this.getHrRole(id)
     .subscribe(res=>{
       if(res!=null)
         this.role = "hr";
     })

     this.getSupervisorRole(id)
     .subscribe(res=>{
       if(res!=null)
         this.role = "supervisor";
     })

     if(this.role == null)
       this.role = "employee"
     
     return this.role;
  }

  //Get data from mssql database using employee id
  getCsoRole(employeeID) :any {
     return this.http
    .get(this.config.connect.url+this.config.connect.port+'/employee/verifyCso/' + employeeID)
    .map(res => console.log(res.json()));

  }

  //Get data from mssql database using employee id
  getSupervisorRole(employeeID) :any {
     return this.http
    .get(this.config.connect.url+this.config.connect.port+'/employee/verifySupervisor/' + employeeID)
    .map(res => console.log(res.json()));

  }

//Get data from mssql database using employee id
  getHrRole(employeeID) :any {
     return this.http
    .get(this.config.connect.url+this.config.connect.port+'/employee/verifyHr/' + employeeID)
    .map(res => console.log(res.json()));

  }

  getToken(token)
{
  console.log("toto"+token)
  let headers = new Headers({ 'Authorization': token });
  let options= new RequestOptions({ headers: headers });
    return this.http
           .get(this.config.connect.url+this.config.connect.port+'/login',options)
           .map(res=>res.json(),
               (err:any)=>{
            err.json();
               });
        }
}
