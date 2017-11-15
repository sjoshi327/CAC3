import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { config } from '../../config';

@Component({
  selector: 'app-accessforms',
  templateUrl: './accessforms.component.html',
  styleUrls: ['./accessforms.component.css']
})
export class AccessformsComponent implements OnInit {
  category: string = "";
  selectedCategory: string = "";
  accessTypeCase: string = "";
  accesstype: string = "";
  config = config;

  public modalRef: BsModalRef;

  public configModal = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(private modalService: BsModalService) {}

  //this method will call on change of radio button and retain the value of changed radio button
  OnRadioButtonSelection() {
    this.selectedCategory = this.category; //storing the value of radio button to another variable
    this.accessTypeCase = "";
  }

  //this method on change of accesstype radio button and retain the value of acesstype
  onCaseChange() {
    this.accessTypeCase = this.accesstype;
  }

  ngOnInit() {
  }

  public openModalWithClass(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template, Object.assign({}, this.configModal, { class: 'gray modal-lg' }));
  }

}
