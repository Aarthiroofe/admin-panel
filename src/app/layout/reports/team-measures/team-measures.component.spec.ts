import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMeasuresComponent } from './team-measures.component';

describe('TeamMeasuresComponent', () => {
  let component: TeamMeasuresComponent;
  let fixture: ComponentFixture<TeamMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
