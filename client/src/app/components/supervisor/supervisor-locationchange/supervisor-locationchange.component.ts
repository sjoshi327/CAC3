import { Component, OnInit } from '@angular/core';
import { config } from '../../../config';
import { ParamMap } from '@angular/router';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { TemplateRef } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import 'rxjs/add/operator/switchMap';

import { LocationChangeService } from '../../../services/location-change.service';

@Component({
  selector: 'app-supervisor-locationchange',
  templateUrl: './supervisor-locationchange.component.html',
  styleUrls: ['./supervisor-locationchange.component.css']
})
export class SupervisorLocationchangeComponent implements OnInit {

  empp: any = [];
	public: any;
	obj: {};
	internal: string;
	restricted: string;
	accessType: string;
	datepickerModel: any;
	errors:any;
	data:any;
	config=config;
	public modalRef: BsModalRef;
	public configModal = {
		animated: true,
		keyboard: true,
		backdrop: true,
		ignoreBackdropClick: false
	};


  constructor(private newrequest: LocationChangeService, private router: ActivatedRoute, private route: Router, private modalService: BsModalService) { }

  ngOnInit() {
  		this.router.paramMap
		.switchMap((params: ParamMap) => this.newrequest.getEmployeeByID(this.router.snapshot.params['value']))
		.subscribe(res => {
			this.empp = res;
			console.log(res);
		})

		error => {
			this.errors = error;
		};

		/*For DatePicker for picking the date*/
		this.datepickerModel = new Date();
		let date = this.datepickerModel.getDate();
		let month = this.datepickerModel.getMonth() + 1;
		let year = this.datepickerModel.getFullYear();
		this.datepickerModel = date + '/' + month + '/' + year;
  }
/*For Accepts The Request Send By Employee*/
	acceptRequest(temp: any):void {
		this.obj = {
			prev: "Supervisor",
			current: "Hr",
			zone: [this.public, this.internal, this.restricted],
			accessType: this.accessType
		}
		this.newrequest.update(this.empp.employeeID, this.obj)
		.subscribe(res => {
			this.data=res;
		},
		error => {
			this.errors = error;
		});
		this.openModalWithClass(temp)
		this.route.navigate(['/superdash']);
	}

	/*For Reject The Request Of Access-Card By Supervisor*/
	rejectRequest(temp: any):any {
		this.openModalWithClass(temp)
	}

	/*For Status Supervisor,Employee*/
	backIt():void {
		this.obj = 
		{
			prev: "Supervisor",
			current: "Employee",
		}

		this.newrequest.update(this.empp.employeeID, this.obj)
		.subscribe(res => {})
		error => {
			this.errors = error;
		}

		alert("Form Rejected Successfully")
		this.route.navigate(['/superdash']);
		this.modalRef.hide();
	}

	public openModalWithClass(template: TemplateRef < any > ):any {
		this.modalRef = this.modalService.show(template, Object.assign({}, this.configModal, { class: 'gray modal-lg' }));
	}

}
