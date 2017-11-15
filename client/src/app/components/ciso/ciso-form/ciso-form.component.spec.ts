import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CisoFormComponent } from './ciso-form.component';

describe('CisoFormComponent', () => {
  let component: CisoFormComponent;
  let fixture: ComponentFixture<CisoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CisoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CisoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
