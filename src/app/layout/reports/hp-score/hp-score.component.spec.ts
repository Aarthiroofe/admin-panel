import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HpScoreComponent } from './hp-score.component';

describe('HpScoreComponent', () => {
  let component: HpScoreComponent;
  let fixture: ComponentFixture<HpScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HpScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HpScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
