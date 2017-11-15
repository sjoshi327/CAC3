import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrlocationchangeFormComponent } from './hrlocationchange-form.component';

describe('HrlocationchangeFormComponent', () => {
  let component: HrlocationchangeFormComponent;
  let fixture: ComponentFixture<HrlocationchangeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrlocationchangeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrlocationchangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
