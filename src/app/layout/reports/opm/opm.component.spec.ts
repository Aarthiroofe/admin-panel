import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpmComponent } from './opm.component';

describe('OpmComponent', () => {
  let component: OpmComponent;
  let fixture: ComponentFixture<OpmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
