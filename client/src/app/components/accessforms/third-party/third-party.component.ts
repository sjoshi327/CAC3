//importing all required dependencies
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ParamMap, Params, ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { ThirdPartyService } from '../../../services/third-party.service';
import { EmployeeService } from '../../../services/employee.service';
import { config } from '../../../config';

@Component({
  selector: 'app-third-party',
  templateUrl: './third-party.component.html',
  styleUrls: ['./third-party.component.css']
})

export class ThirdPartyComponent implements OnInit {

  //declaring all required variables
  errors: any;
  employeeDetail: any = [];
  empId: string;
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
  config = config;
  value: any;

  
  datepickerModel: Date;
  public modalRef: BsModalRef;
  employee: any;
  data:any;

  public configModal = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };
 

  //Constructor initialize LostcardService & Router 
  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private modalService: BsModalService) {}


  //method call on submit button for saving the details of third party
  thirdpartySubmit(term) {
    
  }

  //method called on Go back button and navigate to dashboard of employee
  back() {
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
         
        },
        error => {
          this.errors = error;
        })

    this.date = new Date();
    let day = this.date.getDate();
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();
    this.date = day + '/' + month + '/' + year;
  }
}
