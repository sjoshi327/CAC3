import { async, inject,ComponentFixture,fakeAsync, TestBed,tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { EmployeeService } from '../../../services/employee.service';
import { SupervisorFormComponent } from './supervisor-form.component';

describe(' SupervisorFormComponent', () => {
  let data: any;
  let component:SupervisorFormComponent;
  let fixture: ComponentFixture < SupervisorFormComponent > ;
  let id,name,de:DebugElement;
  let elID,elNAME,el:HTMLElement;
  let service;
  let spy;
  let test = {
    "response": { "n": 1, "ok": 1, "nModified": 1 },
    "data": { "response": "category already exixts" },
    "prev": { "prev": "Supervisor" },
    "current": { "current": "Hr" },
    "negativeResponse": { "ok": "0", "nModified": "0", "n": "0" },
    "categoryResponse": { "Response": "category Name alerady exist" }
  };
  
  //Initializing The Test Suite
  beforeEach(async(() => {
    //Initializing The Router Stub For Routing
    class RouterStub {
      navigate(url: string) { return url; }
    }

    data = test.response;

    TestBed.configureTestingModule({
      declarations: [SupervisorFormComponent], //Declarations For Test Component
      imports:[BrowserModule,HttpModule,FormsModule], //All Predefined Modules
      providers:[{provide:EmployeeService},{ provide: Router, useClass: RouterStub},{provide:ActivatedRoute},{provide:BsModalService}]
    })

    
    .compileComponents() // Compile Template And Css
    .then(() => {
      fixture = TestBed.createComponent(SupervisorFormComponent);
      component = fixture.componentInstance;

      //Query For The Title <h1> By CSS Element Selector
      id = fixture.debugElement.query(By.css('.id'));
      elID =id.nativeElement;

      name = fixture.debugElement.query(By.css('.name'));
      elNAME =name.nativeElement;
      fixture.detectChanges();
    });
  }));

  //Test Case For Component Will Work Correct 
  it('Display Component Will Work Correctly', () => {
    expect(component).toBeDefined(SupervisorFormComponent);
  });

  //Test Case For EmployeeId field Will Correct 
  it('Display Employee Id Correctly', () => {   
    fixture.detectChanges();    
    expect(elID.textContent).toContain(component.config.supervisorform.EMPP_ID);
  });

  //Test Case For EmployeeName field Will Correct 
  it('Display Employee Name Correctly', () =>{
    component.config.supervisorform.NAME ='Shubhang';
    fixture.detectChanges();    
    expect(elNAME.textContent).toContain('Shubhang');
  });    

  //Test Case For EmployeeId field Will Not Correct
  it('Display Employee Id Not Correct ', () => {
    component.config.supervisorform.EMPP_ID =50042924;
    fixture.detectChanges();    
    expect(elID.textContent).not.toContain('50042925');
  });

  //Test Case For EmployeeName field Will Not Correct
  it('Display Employee Name Not Correct', () => {
    component.config.supervisorform.NAME ='Shubhang';
    fixture.detectChanges();    
    expect(elNAME.textContent).not.toContain('Shubhang Gupta');
  }); 
  //test case for add category method
  it("testing the save method", () => {
    service = fixture.debugElement.injector.get(EmployeeService);
    spy = spyOn(service, 'update').and.returnValue(Observable.of(data));
    fixture.detectChanges();
    component.acceptRequest(test.prev.prev);
    expect(component.data.n).toEqual(1);
    expect(component.data.nModified).toEqual(1);
    expect(component.data.ok).toEqual(1);
  });

   



});
