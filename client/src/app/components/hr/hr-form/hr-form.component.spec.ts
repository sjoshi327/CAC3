import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFormComponent } from './hr-form.component';

describe('HrFormComponent', () => {
  let component: HrFormComponent;
  let fixture: ComponentFixture<HrFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
