import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsoDashboardComponent } from './cso-dashboard.component';

describe('CsoDashboardComponent', () => {
  let component: CsoDashboardComponent;
  let fixture: ComponentFixture<CsoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
