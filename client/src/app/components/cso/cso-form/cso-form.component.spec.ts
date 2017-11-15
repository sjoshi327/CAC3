import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsoFormComponent } from './cso-form.component';

describe('CsoFormComponent', () => {
  let component: CsoFormComponent;
  let fixture: ComponentFixture<CsoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
