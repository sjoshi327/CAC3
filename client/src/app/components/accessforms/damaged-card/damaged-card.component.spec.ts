import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Inject }    from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { DamagedCardComponent } from './damaged-card.component';
import { DamagedCardService } from './../../../services/damaged-card.service';
import  {Observable} from "rxjs/Observable";
//import "rxjs/add/Observable/of";

class RouterStub {
  navigate(url: string) { return url; }
}
describe('Damaged Card Component testing', () => {
  let component: DamagedCardComponent;
  let fixture: ComponentFixture<DamagedCardComponent>;
  let de,dId, dName, dDate, dSubmit: DebugElement;
  let el,eId, eName, eDate, eSubmit: HTMLElement;
  let comment, date,spy;
  const data=[];
  let damageService:DamagedCardService;// for component service testing
  let damagedCardService;//for root service testing
  
  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ DamagedCardComponent ],
      imports: [FormsModule, HttpModule],
      providers:[{provide: DamagedCardService,usevalue:damageService}, {provide: HttpModule}, {provide: Router, useClass: RouterStub}]
    })
    .compileComponents();
  });

  beforeEach(async() => {
    fixture = TestBed.createComponent(DamagedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    damageService=fixture.debugElement.injector.get(DamagedCardService);
    damagedCardService= TestBed.get(DamagedCardService);

    //console.log(damageService);

    dId = fixture.debugElement.query(By.css('.damageid'));
    eId= dId.nativeElement;

    dName = fixture.debugElement.query(By.css('.damagename'));
    eName= dName.nativeElement;

    dDate = fixture.debugElement.query(By.css('.damagedate'));
    eDate= dDate.nativeElement;

    dSubmit = fixture.debugElement.query(By.css('.damagesubmit'));
    eSubmit= dSubmit.nativeElement;

    //fixture.detectChanges();
  });

  //test for service method
  it('should add new damage after calling damageservice',()=>  {
    spy= spyOn(damageService,'damage').and.returnValue({status:200});
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.damagesubmit'));
    el = de.nativeElement;
    el.click();
  });
  it('should check router navigate', ()=> {
    inject([Router], (router: Router)=> {
      
    })
  })

  //test for component checking senerio
  it('should created the damage component', () => {
    expect(component).toBeDefined();
  });

  //test whether employee id is working properly
  it('should check the damage Employee Id', () => {
    fixture.detectChanges();
    expect(eId.textContent).toContain(component.config.damage.EMP_ID);
  });
  it('should check for no damage Employee Id', () => {
    component.config.damage.EMP_ID='';
    fixture.detectChanges();
    expect(eId.textContent).toEqual('');
  });

  //test whether employee name is working properly
  it('should check for the damage Employee Name', () => {
    fixture.detectChanges();
    expect(eName.textContent).toContain(component.config.damage.NAME);
  });
  it('should check for no damage Name', () => {
    component.config.damage.NAME='';
    fixture.detectChanges();
    expect(eName.textContent).toEqual('');
  });

  //test whether submit date is working
  it('should check the damage Submit Date', () => {
    fixture.detectChanges();
    expect(eDate.textContent).toContain(component.config.damage.SUBMIT_DATE);
  });
  
  it('should check the for no damage Submit Date', () => {
    component.config.damage.SUBMIT_DATE='';
    fixture.detectChanges();
    expect(eDate.textContent).toEqual('');
  });

  //test whether sunbmit button is working
  it('should check the damage Submit', () => {
    fixture.detectChanges();
    expect(eSubmit.textContent).toContain(component.config.damage.SUBMIT);
  });
  it('should check the for no damage Submit', () => {
    component.config.damage.SUBMIT='';
    fixture.detectChanges();
    expect(eSubmit.textContent).toEqual('');
  });

});
