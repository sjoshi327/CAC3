// imports 
import { Component, OnInit } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { TemplateRef } from '@angular/core';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { EmployeeService } from '../../../services/employee.service';
import { config } from '../../../config';

@Component({
  selector: 'app-hr-form',
  templateUrl: './hr-form.component.html',
  styleUrls: ['./hr-form.component.css']
})
export class HrFormComponent implements OnInit {
// variable declaration 
  empp: any = [];
  e: any;
  datepickerModel: any;
  errors: any;
  config = config;
  public modalRef: BsModalRef;
  public configg = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(private newrequest: EmployeeService, private route: Router, private router: ActivatedRoute, private modalService: BsModalService) {}

  ngOnInit() {
    this.router.paramMap
    .switchMap((params: ParamMap) => this.newrequest.getEmployeeByID(this.router.snapshot.params['value']))
    .subscribe(res => {
      this.empp = res;
    },
    error => {
      this.errors = error;
    });
    this.datepickerModel = new Date();
    let a = this.datepickerModel.getDate();
    let b = this.datepickerModel.getMonth() + 1;
    let c = this.datepickerModel.getFullYear();
    this.datepickerModel = a + '/' + b + '/' + c;
  }

  // accepting request 
  accept(temp: any): any {
    this.e = {
      prev: "Hr",
      current: "Cso",
    }
    this.newrequest.update(this.empp.employeeID, this.e)
    .subscribe(res => {},
      error => {
        this.errors = error;
      })
    this.openModalWithClass(temp)
    this.route.navigate(['/hrdash']);
  }

  // rejecting request 
  reject(temp: any): void {
    this.openModalWithClass(temp)
  }

  // status change 
  backit(): any {
    this.e = {
      prev: "Hr",
      current: "Supervisor",
    }
    this.newrequest.update(this.empp.employeeID, this.e)
    .subscribe(res => {},
      error => {
        this.errors = error;
      })
    this.route.navigate(['/hrdash']);
    this.modalRef.hide();
  }

  // model class 
  public openModalWithClass(template: TemplateRef < any > ): any {
    this.modalRef = this.modalService.show(template, Object.assign({}, this.configg, { class: 'gray modal-lg' }));
  }
}
