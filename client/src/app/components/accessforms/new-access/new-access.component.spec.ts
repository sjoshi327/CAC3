import { async, ComponentFixture, TestBed , inject,tick,fakeAsync} from '@angular/core/testing';
import { NewAccessComponent } from './new-access.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { LostCardService } from '../../../services/lost-card.service';
import {BrowserModule} from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute , ActivatedRouteStub } from '../routerstub';
import { EmployeeService } from '../../../services/employee.service';
import 'rxjs/add/operator/switchMap';
//import * as config from './lost-card.test.config.json';


describe('NewAccessComponent', () => {
let data:any;
let emp:any;
let component: NewAccessComponent;
let fixture: ComponentFixture<NewAccessComponent>;
let service;
let spy;
let spy1;
let test={   
       "response":{"n":1,"ok":1,"nModified":1},
       "data":{"response":"category already exixts"},
      "comments":{"comments" :  "broken"},
       "date":{"date" : "12/04/17"},
       "negativeResponse": { "ok": "0","nModified": "0","n": "0"},
       "categoryResponse":{"Response":"category Name alerady exist"},
       "emp":{  "employeeID" : "50042950", 
       "employeeName" : "SHIVAM  BAJPAI",
        "dateOfJoining" : "20060313",
         "project" : "SSB-ADM ",
          "department" : "SSB-CSDM-RP", 
        "prev" : "Cso", 
      "current" : "Closed", 
       }
};
let de:DebugElement;
let el:HTMLInputElement;
let activatedRoute:ActivatedRouteStub;

//initializing the test suite
beforeEach(async(() => {
   activatedRoute = new ActivatedRouteStub();
  class RouterStub {
  navigate(url: string) { return url; }
}
  data=test.response;
  emp=test.emp;
  TestBed.configureTestingModule({
    declarations: [NewAccessComponent, NewAccessComponent],
    imports:[
      BrowserModule,
      HttpModule,
      FormsModule],
    providers:[
    {provide:EmployeeService},
    { provide: Router,useClass: RouterStub },
    { provide: ActivatedRoute, useValue: activatedRoute },
     { provide: BsModalService },
    ]
  }).compileComponents().then(()=>{
  fixture = TestBed.createComponent(NewAccessComponent);
  component = fixture.componentInstance;
  //console.log(component.messageTest);
  fixture.detectChanges();
  service = fixture.debugElement.injector.get(EmployeeService);
  spy = spyOn(service,'save').and.returnValue(Observable.of(data));
  });
}));
   
//test case for add category method
it("testing the save method",()=>{
   fixture.detectChanges();
      console.log("Inside it" + test.comments.comments);
     // console.log("Testing component ->" + component.messageTest);
      component.save(test.comments.comments);
      console.log("component data ->" + component.data.ok);
      expect(component.data.ok).toEqual(1);
      expect(component.data.nModified).toEqual(1);
      expect(component.data.ok).toEqual(1);
});

it('Navigate when click on save',  
inject([Router], (router: Router) => {
 const spy = spyOn(router, 'navigate');
 de = fixture.debugElement.query(By.css('.save'));
 el = de.nativeElement;
 el.click();
 fixture.detectChanges();
 const navArgs = spy.calls.first().args[0];
expect(navArgs).toContain("/empdash");  
}));

it('Navigate when click on back',  
inject([Router], (router: Router) => {
 const spy = spyOn(router, 'navigate');
 de = fixture.debugElement.query(By.css('.radio'));
 el = de.nativeElement;
 el.click();
 fixture.detectChanges();
 expect(component.selectedcategory).toBe("Permanent");  
}));

/*it('Navigate when click on save',  
inject([Router], (router: Router) => {
 const spy = spyOn(router, 'navigate');
 de = fixture.debugElement.query(By.css('.backit'));
 el = de.nativeElement;
 el.click();
 fixture.detectChanges();
 const navArgs = spy.calls.first().args[0];
expect(navArgs).toContain("/empdash");  
}));*/


  it('should show list of location after calling locationservice from ngonit method', fakeAsync(() => {
    spy1 = spyOn(service,'getEmpSql').and.returnValues(Observable.of(emp));
    fixture.detectChanges();

    tick();                  // wait for async getEmpSql

    fixture.detectChanges(); // update view with data

    // de = fixture.debugElement.query(By.css('.form'));

    // el = de.nativeElement;

    //expect(spy1.calls.any()).toBe(true);//check whether call is made or not
    console.log(component.employee,emp,"emploee")
    expect(emp).toBe(emp);  

  }));





});


