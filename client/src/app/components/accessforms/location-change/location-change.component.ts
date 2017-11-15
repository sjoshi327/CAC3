import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router, ParamMap, Params, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { LocationChangeService } from '../../../services/location-change.service';
import { EmployeeService } from '../../../services/employee.service';
import { config } from '../../../config';

@Component({
  selector: 'app-location-change',
  templateUrl: './location-change.component.html',
  styleUrls: ['./location-change.component.css']
})

//location change component class starts here
export class LocationChangeComponent implements OnInit {
	public location:any;
	errors:any;
	//declaring all required variables
  employeeDetail: any = [];
  empId: String;
  date: any;
  status: string = "";
  change: string = "";
  a: any;
  empType: any;
  selectedcategory: any;
  empName: any;
  doj: any;
  designation: any;
  project: any;
  department: any;
  doe: any;
  existPro: any;
  newPro: any;
  appSign: any;
  dateCurr: any;
  employee:any;
	config = config;
  value: any;

	public modalRef: BsModalRef;

	 public configModal = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

	//constructor initialize's location change service & router
	constructor(private locationChangeService:LocationChangeService, private employeeService: EmployeeService, private router:Router, private route: ActivatedRoute, private modalService: BsModalService) {

	}

	//method called on submit button for saving the details of location change form
	locationChangeSubmit(locationchange:any):any {
		return this.locationChangeService.locationChangeMethod(locationchange.value)
		.subscribe((data:any):void=> {
			console.log(data);
			this.router.navigate(['/empdash']);  
		},
    	error=>{
     	this.errors=error
     })
	}

	//method called on Go Back button and navigate to dashboard of employee 
	back(): void {
		this.router.navigate(['/empdash']);
	}

		ngOnInit() {
      this.value= localStorage.getItem("userDetails")
         let userRole=JSON.parse(this.value).data.role;
         let empid=JSON.parse(this.value).data.UserID;
         
		 this.route.paramMap
      .switchMap((params: ParamMap) => this.employeeService.getEmpSql(empid))
      .subscribe(
        res => {
          this.employee = res;
          this.empId = this.employee[0][0].EMPNO;
          this.empName = this.employee[0][0].NAME;
          this.doj = this.employee[0][0].DOJ;
          this.project = this.employee[0][0].PRACTICE;
          this.department = this.employee[0][0].OUTXT;
        },
        error => {
          this.errors = error;
        })

    this.date = new Date();
    let day = this.date.getDate();
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();
    this.date = day + '/' + month + '/' + year;

  //method to open modal window
 // public openModalWithClass(template: TemplateRef < any > ): any {
  //  this.modalRef = this.modalService.show(template, Object.assign({}, this.configModal, { class: 'gray modal-lg' }));

 	}
}





 