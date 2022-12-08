import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartMeasuresComponent } from './heart-measures.component';

describe('HeartMeasuresComponent', () => {
  let component: HeartMeasuresComponent;
  let fixture: ComponentFixture<HeartMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartMeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
