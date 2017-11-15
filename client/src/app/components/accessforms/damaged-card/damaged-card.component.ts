//importing all required dependencies
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ParamMap, Params, ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { LostCardService } from '../../../services/lost-card.service';
import { EmployeeService } from '../../../services/employee.service';
import { config } from '../../../config';
import { DamagedCardService } from './../../../services/damaged-card.service';


@Component({
  selector: 'app-damaged-card',
  templateUrl: './damaged-card.component.html',
  styleUrls: ['./damaged-card.component.css'],
  providers:[DamagedCardService]
})
export class DamagedCardComponent implements OnInit {

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
  
  //constructor initialises DamagedCardService and Router 
  constructor(private damagecardService: DamagedCardService,private employeeService: EmployeeService, private lostCardService: LostCardService, private router: Router, private route: ActivatedRoute, private modalService: BsModalService) {}

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
  }

  //method to take data of form to DamagedCardService to hit api
  getDamage(damageReason:string, damageDate:string):any {
    this.data= { comments:damageReason, date:damageDate }  
    this.damagecardService.damage(this.data)
    .subscribe((data)=> {
      this.router.navigate(['/empdash']);
      })
    }

  //navigate data to EmployeeDashboardComponent on back button clicking
  back() :void {
    this.router.navigate(['/empdash']);
    }
}
