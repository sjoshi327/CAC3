import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsolocationFormComponent } from './csolocation-form.component';

describe('CsolocationFormComponent', () => {
  let component: CsolocationFormComponent;
  let fixture: ComponentFixture<CsolocationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsolocationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsolocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
