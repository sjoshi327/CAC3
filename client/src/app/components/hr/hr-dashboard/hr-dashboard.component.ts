/*imports required for this Component*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DamagedCardService } from '../../../services/damaged-card.service';
import { LostCardService } from '../../../services/lost-card.service';
import { LocationChangeService } from '../../../services/location-change.service';
import { ThirdPartyService } from '../../../services/third-party.service';
import { EmployeeService } from '../../../services/employee.service';
import { config } from '../../../config';


@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.css']
})

/*class starts here*/
export class HrDashboardComponent implements OnInit {
  emp: any = [];
  super: any = [];
  show: any = false;
  errors: any;
  config = config;

  /*constructor of hr dashboard Component*/
  constructor(private damage: DamagedCardService, private lost: LostCardService,
    private location: LocationChangeService, private third: ThirdPartyService,
    private newrequest: EmployeeService, private router: Router) {}

  /*method to send employee id to hr component through navigate*/
  getID(value) {
    console.log('from getID');
    this.router.navigate(['/hrform', value]);
  }

    getEmpIdLocationRequest(value) {
    console.log('from getID');
    this.router.navigate(['/hrlocationform', value]);
  }

  /*ngonit method for this class*/
  ngOnInit() {
  }

  /*method to get config file elements*/
  getConfig(): any {
    return Promise.resolve(config)
      .then(data => {
        this.config = data;
      })
  }

  /*method to get details of employee having damage card*/
  showAccess() {
    this.damage.getDamageCard()
      .subscribe(res => {
        console.log(res)
      });

    /* method of lost card service is called to get details of employee who lost the card*/
    this.lost.getLostCard()
      .subscribe(res => console.log(res), error => {
        this.errors = error
      });

    /* method of third party service is called to get details of third party employee*/
    this.third.getThird()
      .subscribe(res => console.log(res), error => {
        this.errors = error
      });

    /* method of location change service is called to get details of employee who changed location*/
    this.location.getLocationChange()
      .subscribe(res => {
       // this.errors = error
           this.emp = res;

        /*for loop to set the pending status*/
        for (let a = 0; a < this.emp.length; a++) {
          if (this.emp[a].current == "Hr") {
            this.super.push(this.emp[a])
          }
        }
      });

    /* method of control access service is called to get details of employee*/
    this.newrequest.getEmployee()
      .subscribe(res => {

        this.emp = res;

        /*for loop to set the pending status*/
        for (let a = 0; a < this.emp.length; a++) {
          if (this.emp[a].current == "Hr") {
            this.super.push(this.emp[a])
          }
        }
      });

    this.show = !this.show;
  }
  /*showAccess() ends here*/
}
/*class ends here*/
