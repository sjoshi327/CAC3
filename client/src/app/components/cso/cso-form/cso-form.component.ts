import { Component, OnInit } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { TemplateRef } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import 'rxjs/add/operator/switchMap';

import { EmployeeService } from '../../../services/employee.service';
import { config } from '../../../config';

@Component({
  selector: 'app-cso-form',
  templateUrl: './cso-form.component.html',
  styleUrls: ['./cso-form.component.css']
})

export class CsoFormComponent implements OnInit {
  //declaring the variables
  accessCard: any;
  issued: any;
  datepickerModel: any;
  empp: any = [];
  obj: any;
  errors: any;
  config = config;

  public modalRef: BsModalRef;

  public configModal = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  //constructor to initialize the ControlAccessService
  constructor(private newrequest: EmployeeService, private route: Router, private router: ActivatedRoute, private modalService: BsModalService) {}

  //ngoninit method to calling the getEmployeeByID from control access service automatically
  ngOnInit(): void {
    this.router.paramMap
    .switchMap((params: ParamMap) => this.newrequest.getEmployeeByID(this.router.snapshot.params['value']))
    .subscribe(res => {
      this.empp = res;
    },
    error => {
      this.errors = error;
    }
    );

    //making instance of Date for fetch current date
    this.datepickerModel = new Date();
    let day = this.datepickerModel.getDate();
    let month = this.datepickerModel.getMonth() + 1;
    let year = this.datepickerModel.getFullYear();
    this.datepickerModel = day + '/' + month + '/' + year;
  }

  // accept method to accept the form and allow the access card
  accept(temp: any): void {
    this.obj = {
      prev: "Cso",
      current: "Closed",
      issuedBy: this.issued,
      issueDate: this.datepickerModel,
      cardno: this.accessCard
    }
    this.newrequest.update(this.empp.employeeID, this.obj)
    .subscribe(res => {
    });
    this.openModalWithClass(temp)
    this.route.navigate(['/csodash']);
  }

  //reject method to reject the form and send to previous level
  reject(temp: any): void {
    this.openModalWithClass(temp)
  }

  //backit method for status change
  backit(): void {
    this.obj = {
      prev: "Cso",
      current: "Hr",
    }
    this.newrequest.update(this.empp.employeeID, this.obj)
    .subscribe(res => {
    });
    this.route.navigate(['/csodash']);
    this.modalRef.hide();
  }

  public openModalWithClass(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template, Object.assign({}, this.configModal, { class: 'gray modal-lg' }));
  }
}
