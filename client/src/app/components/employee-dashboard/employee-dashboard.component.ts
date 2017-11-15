import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { LocationChangeService } from '../../services/location-change.service';

import { config } from '../../config';
//component
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})

//dashboard class
export class EmployeeDashboardComponent implements OnInit {

//variable declaration
  empl: any = [];
  emply:any =[];
  reqstatus: any;
  errors: any;
  config = config;

  //construtor for employeeDashboard class
  constructor(private emp: EmployeeService,private emplye: LocationChangeService ) { }

  ngOnInit() {
  	//method to get employee data
    this.emp.getEmployee()
    .subscribe(res=>{
      this.empl = res;
if(this.empl.length>0){
      //condition to check the status on the basis of particular approver
      if(this.empl[this.empl.length-1].current=="Closed")
      {
        this.reqstatus = "Your request has been approved by CSO";
      }
      else if(this.empl[this.empl.length-1].current=="Employee" && this.empl[this.empl.length-1].prev=="Supervisor")
      {
        this.reqstatus = "Your request has been rejected by Supervisor";
      }
      else if(this.empl[this.empl.length-1].current=="Supervisor" && this.empl[this.empl.length-1].prev=="Hr")
      {
        this.reqstatus = "Your request has been rejected by Hr";
      }
      else if(this.empl[this.empl.length-1].current=="Hr" && this.empl[this.empl.length-1].prev=="Cso")
      {
        this.reqstatus = "Your request has been rejected by CSO";
      }
      else if(this.empl[this.empl.length-1].current=="Supervisor" && this.empl[this.empl.length-1].prev=="Employee")
      {
        this.reqstatus = "Your request is pending with Supervisor";
      }
      else if(this.empl[this.empl.length-1].current=="Hr" && this.empl[this.empl.length-1].prev=="Supervisor")
      {
        this.reqstatus = "Your request is pending with Hr";
      }
      else if(this.empl[this.empl.length-1].current=="Cso" && this.empl[this.empl.length-1].prev=="Hr")
      {
        this.reqstatus = "Your request is pending with CSO";
      }
    }
      else {
        this.reqstatus = "You haven't made any request yet";
      }
    },
    error=>{
    	this.errors=error;
    })
    

    /*//method to get employee data
    this.emplye.getEmployee()
    .subscribe(res=>{
      this.emply = res;

      //condition to check the status on the basis of particular approver
      if(this.empl[this.empl.length-1].current=="Closed")
      {
        this.reqstatus = "lost card request has been approved by CSO";
      }
      else if(this.empl[this.empl.length-1].current=="Employee" && this.empl[this.empl.length-1].prev=="Supervisor")
      {
        this.reqstatus = "lost card request has been rejected by Supervisor";
      }
      else if(this.empl[this.empl.length-1].current=="Supervisor" && this.empl[this.empl.length-1].prev=="Hr")
      {
        this.reqstatus = "lost card request has been rejected by Hr";
      }
      else if(this.empl[this.empl.length-1].current=="Hr" && this.empl[this.empl.length-1].prev=="Cso")
      {
        this.reqstatus = " lost card request has been rejected by CSO";
      }
      else if(this.empl[this.empl.length-1].current=="Supervisor" && this.empl[this.empl.length-1].prev=="Employee")
      {
        this.reqstatus = "lost card request is pending with Supervisor";
      }
      else if(this.empl[this.empl.length-1].current=="Hr" && this.empl[this.empl.length-1].prev=="Supervisor")
      {
        this.reqstatus = "lost card request is pending with Hr";
      }
      else if(this.empl[this.empl.length-1].current=="Cso" && this.empl[this.empl.length-1].prev=="Hr")
      {
        this.reqstatus = "lost card request is pending with CSO";
      }
      else {
        this.reqstatus = "lost card haven't made any request yet";
      }
    },
    error=>{
      this.errors=error;
    }
    )*/


  }

}






