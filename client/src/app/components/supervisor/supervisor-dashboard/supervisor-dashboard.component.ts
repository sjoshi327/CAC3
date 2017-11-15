import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'

import { DamagedCardService} from '../../../services/damaged-card.service';
import { LostCardService} from '../../../services/lost-card.service'
import { LocationChangeService} from  '../../../services/location-change.service'
import { ThirdPartyService} from '../../../services/third-party.service'
import { EmployeeService } from '../../../services/employee.service'
import { config } from '../../../config';
@Component({
  selector: 'app-supervisor-dashboard',
  templateUrl: './supervisor-dashboard.component.html',
  styleUrls: ['./supervisor-dashboard.component.css']
})
export class SupervisorDashboardComponent implements OnInit {

  //variables declarations
  emp:any = [];
  newaccess:any=[];
  thirdparty:any=[];
  lostrequest:any=[];
  damagerequest:any=[];
  locationrequest:any=[];
  show:boolean = false;
  config = config;

  //constructor initializing required services and router
  constructor(private damage:DamagedCardService,private lost:LostCardService,
    private location:LocationChangeService,private third:ThirdPartyService,
    private newrequest: EmployeeService, private router: Router) { }

  //method used to fetch requester's form by supervisor
  getID(value):any {
    this.router.navigate(['/superform',value])
  }

   //method used to fetch requester's form by supervisor
  getEmpIdLocationRequest(value):any {
    this.router.navigate(['/supervisorlocationchange',value])
  }

  getEmpIdLostRequest(value):any {
    this.router.navigate(['/supervisorlostchange',value])
  }

  getEmpIdDamageRequest(value):any {
    this.router.navigate(['/supervisordamagechange',value])
  }

  ngOnInit() {
  }

  //method used to show the requests of various user's on supervisor dashboard
  showAccess():any {
    this.damage.getDamageCard()
     .subscribe(res=>{
            this.emp=res;
      for(let a=0;a<this.emp.length;a++)
      {
        if(this.emp[a].current=="Supervisor")
        {
          this.damagerequest.push(this.emp[a])
        }
      }
    });

    this.lost.getLostCard()
    .subscribe(res=>{
            this.emp=res;
      for(let a=0;a<this.emp.length;a++)
      {
        if(this.emp[a].current=="Supervisor")
        {
          this.lostrequest.push(this.emp[a])
        }
      }
    });


    this.third.getThird()
    .subscribe(res=>{
    });

    this.location.getLocationChange()
    .subscribe(res=>{
        this.emp=res;
      for(let a=0;a<this.emp.length;a++)
      {
        if(this.emp[a].current=="Supervisor")
        {
          this.locationrequest.push(this.emp[a])
        }
      }
    });

    this.newrequest.getEmployee()
    .subscribe(res=>{
      this.emp=res;
      for(let a=0;a<this.emp.length;a++)
      {
        if(this.emp[a].current=="Supervisor")
        {
          this.newaccess.push(this.emp[a])
        }
      }
    });
    this.show = !this.show;
  }
}
