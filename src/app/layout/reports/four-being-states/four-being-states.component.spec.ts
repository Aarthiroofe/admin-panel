import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourBeingStatesComponent } from './four-being-states.component';

describe('FourBeingStatesComponent', () => {
  let component: FourBeingStatesComponent;
  let fixture: ComponentFixture<FourBeingStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourBeingStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourBeingStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
