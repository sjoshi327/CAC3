import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';
import { LostCardComponent } from './lost-card.component';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { LostCardService } from '../../../services/lost-card.service';
import { BrowserModule } from '@angular/platform-browser';

describe(' LostCardComponent', () => {
  let data: any;
  let component: LostCardComponent;
  let fixture: ComponentFixture < LostCardComponent > ;
  let service;
  let spy;
  let test = {
    "response": { "n": 1, "ok": 1, "nModified": 1 },
    "data": { "response": "category already exixts" },
    "comments": { "comments": "broken" },
    "date": { "date": "12/04/17" },
    "negativeResponse": { "ok": "0", "nModified": "0", "n": "0" },
    "categoryResponse": { "Response": "category Name alerady exist" }

  };
  let de: DebugElement;
  let el: HTMLInputElement;


  //initializing the test suite
  beforeEach(async(() => {
    class RouterStub {
      navigate(url: string) { return url; }
    }
    data = test.response;
    TestBed.configureTestingModule({
      declarations: [LostCardComponent, LostCardComponent],
      imports: [
        BrowserModule,
        HttpModule,
        FormsModule
      ],
      providers: [
        { provide: LostCardService },
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LostCardComponent);
      component = fixture.componentInstance;
      //console.log(component.messageTest);
      fixture.detectChanges();
      service = fixture.debugElement.injector.get(LostCardService);
      spy = spyOn(service, 'save').and.returnValue(Observable.of(data));


    });
  }));

  //test case for add category method
  it("testing the save method", () => {
    fixture.detectChanges();
    component.save(test.comments.comments, test.date.date);
    expect(component.data.n).toEqual(1);
    expect(component.data.nModified).toEqual(1);
    expect(component.data.ok).toEqual(1);
  });

  it('Navigate when user click on save',
    inject([Router], (router: Router) => {
      const spy1 = spyOn(router, 'navigate');
      de = fixture.debugElement.query(By.css('.save'));
      el = de.nativeElement;
      el.click();
      fixture.detectChanges();
      const navArgs = spy1.calls.first().args[0];
      expect(navArgs).toContain("/empdash");
    }));

  it('Navigate when master user log in',
    inject([Router], (router: Router) => {
      const spy1 = spyOn(router, 'navigate');
      de = fixture.debugElement.query(By.css('.back'));
      el = de.nativeElement;
      el.click();

      //component.login();
      fixture.detectChanges();
      const navArgs = spy1.calls.first().args[0];
      console.log(navArgs);
      expect(navArgs).toContain("/empdash");
    }));

  //negative test case for add category method

  it("negative test for save method", () => {
    //  let data=test.response;
    let negativeData = test.negativeResponse;
    // component.data=test.categoryData;
    component.save(test.comments.comments, test.date.date);
    fixture.detectChanges();
    console.log("this is spy response", component.data.n);
    expect(component.data.n).not.toEqual(negativeData.nModified);
    expect(component.data.nModified).not.toEqual(negativeData.n);
    expect(component.data.ok).not.toEqual(negativeData.ok);

  })


});
