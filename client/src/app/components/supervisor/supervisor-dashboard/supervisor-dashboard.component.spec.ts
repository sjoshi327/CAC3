import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SupervisorDashboardComponent } from './supervisor-dashboard.component';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { DamagedCardService } from '../../../services/damaged-card.service';
import { LocationChangeService } from '../../../services/location-change.service';
import { LostCardService } from '../../../services/lost-card.service';
import { ThirdPartyService } from '../../../services/third-party.service';
import {  Router } from '@angular/router';

//testsuit for testcases
describe('SupervisorDashboardComponent', () => {
  let component: SupervisorDashboardComponent;
  let fixture: ComponentFixture<SupervisorDashboardComponent>;
  let access_req, new_req:      DebugElement;
  let elAccess_req, elNew_req:      HTMLElement;

// beforeEach will run before every it() testcase
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorDashboardComponent ],
      providers:[{provide: EmployeeService}, {provide: DamagedCardService}, {provide: Router},{provide: LostCardService},{provide: LocationChangeService}, {provide: ThirdPartyService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorDashboardComponent);
    component = fixture.componentInstance;

   access_req = fixture.debugElement.query(By.css('.access_req'));
   elAccess_req= access_req.nativeElement;

   new_req = fixture.debugElement.query(By.css('.new_req'));
   elNew_req= new_req.nativeElement;

   fixture.detectChanges();
  });

// test scenario for component created or not
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

//testcase for verifying that textcontent contain actual access_request
  it('should display Access request', () => {
    fixture.detectChanges();      
    expect(elAccess_req.textContent).toContain(component.config.supervisordash.ACCESS_REQUESTS);
  });

//testcase for verifying that textcontent contain actual new_request
  it('should display New request', () => {
    fixture.detectChanges();
    expect(elNew_req.textContent).toContain(component.config.supervisordash.NEW_REQUEST);
  });
});
