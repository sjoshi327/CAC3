import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CisoDashboardComponent } from './ciso-dashboard.component';

describe('CisoDashboardComponent', () => {
  let component: CisoDashboardComponent;
  let fixture: ComponentFixture<CisoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CisoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CisoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
