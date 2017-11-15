//importing all required dependencies
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ParamMap, Params, ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { EmployeeService } from '../../../services/employee.service';
import { config } from '../../../config';

@Component({
  selector: 'app-new-access',
  templateUrl: './new-access.component.html',
  styleUrls: ['./new-access.component.css'],
   providers: [EmployeeService]
})

export class NewAccessComponent implements OnInit {
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

  constructor(private employeeAccess: EmployeeService, private router: Router, private route: ActivatedRoute, private modalService: BsModalService) {}

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

  //method to save all the details from form to database
  save(template: any): void {
    const employee = {
      employeeID: this.empId,
      empType: this.empType,
      employeeName: this.empName,
      designation: this.designation,
      dateOfJoining: this.doj,
      dateOfExpiry: this.doe,
      project: this.project,
      department: this.department,
      existingProject: this.existPro,
      newProject: this.newPro,
      requestDate: this.dateCurr,
      prev: "Employee",
      current: "Supervisor"
    }
    this.employeeAccess.save(employee).subscribe(data => {
      this.data=data;
    })
    this.openModalWithClass(template)
    this.router.navigate(['/empdash']);
  }

  backit(): any {
    this.router.navigate(['/empdash']);
    this.modalRef.hide();
  }

  //method to go back to employee dashboard
  back(temp: any): any {
    this.openModalWithClass(temp)
  }

  OnRadioButtonSelection() {
    this.selectedcategory = this.empType;
    this.a = "";
  }

  ngOnInit() {
this.value= localStorage.getItem("userDetails")
         let userRole=JSON.parse(this.value).data.role;
         let empid=JSON.parse(this.value).data.UserID;

    this.route.paramMap
      .switchMap((params: ParamMap) => this.employeeAccess.getEmpSql(empid))
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

  //method to open modal window
  public openModalWithClass(template: TemplateRef <any> ): any {
    this.modalRef = this.modalService.show(template, Object.assign({}, this.configModal, { class: 'gray modal-lg' }));
  }
}
