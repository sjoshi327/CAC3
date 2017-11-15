import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorLocationchangeComponent } from './supervisor-locationchange.component';

describe('SupervisorLocationchangeComponent', () => {
  let component: SupervisorLocationchangeComponent;
  let fixture: ComponentFixture<SupervisorLocationchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorLocationchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorLocationchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
