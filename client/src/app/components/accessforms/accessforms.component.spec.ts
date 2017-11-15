
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

import { AccessformsComponent } from './accessforms.component';
import { NewAccessComponent } from '../accessforms/new-access/new-access.component';
import { LostCardComponent } from '../accessforms/lost-card/lost-card.component';
import { DamagedCardComponent } from '../accessforms/damaged-card/damaged-card.component';
import { LocationChangeComponent } from '../accessforms/location-change/location-change.component';
import { ThirdPartyComponent } from '../accessforms/third-party/third-party.component';

describe('AccessformsComponent', () => {
 let component: AccessformsComponent;
 let fixture: ComponentFixture < AccessformsComponent > ;
 let de: DebugElement;
 let el: HTMLElement;
 let de1: DebugElement;
 let el1: HTMLElement;


 //asyn beforeeach
 beforeEach(async(() => {
   TestBed.configureTestingModule({
       imports: [FormsModule],
       providers: [
         { provide: BsModalService }
       ],
       declarations: [AccessformsComponent, NewAccessComponent, LostCardComponent, DamagedCardComponent, LocationChangeComponent, ThirdPartyComponent]
     })
     .compileComponents();
 }));

 //synchronus beforeEach
 beforeEach(() => {
   fixture = TestBed.createComponent(AccessformsComponent);
   component = fixture.componentInstance;
   de = fixture.debugElement.query(By.css('h5'));
   el = de.nativeElement;
   de1 = fixture.debugElement.query(By.css('.contractor'));
   el1 = de1.nativeElement;
 
   fixture.detectChanges();
 });

 it('should be created', () => {
   expect(component).toBeTruthy();
 });

 it('should display original category value through interpolation', () => {
   //fixture.detectChanges();
   expect(el.textContent).toContain(component.config.accessform.CATEGORY);
 });

 it('should display different category value ', () => {
   component.config.accessform.CATEGORY = "prashant";
   fixture.detectChanges();
   expect(el.textContent).toContain("prashant");
 });

 it('should change the radio button value of category', () => {
   let initialvalue = component.category;
   el1.click();
  // component.OnRadioButtonSelection();
   fixture.detectChanges();
   let newvalue = component.category;
   expect(initialvalue).not.toEqual(newvalue);
 });

 // it('should change the radio button value of aceesstype', () => {

 //   let initialvalue = component.accesstype;
 //     let de2: DebugElement;
 //  let el2: HTMLElement;
 //    de2 = fixture.debugElement.query(By.css('.damage'));
 //    el2 = de2.nativeElement;
 //  el2.click();
 //   //component.onCaseChange();
 //   fixture.detectChanges();
 //   let newvalue = component.accesstype;
 //   expect(initialvalue).not.toEqual(newvalue);
 // });


});