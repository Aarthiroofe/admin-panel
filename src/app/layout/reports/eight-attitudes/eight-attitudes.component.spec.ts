import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EightAttitudesComponent } from './eight-attitudes.component';

describe('EightAttitudesComponent', () => {
  let component: EightAttitudesComponent;
  let fixture: ComponentFixture<EightAttitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EightAttitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EightAttitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
