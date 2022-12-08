import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrguserComponent } from './orguser.component';

describe('OrguserComponent', () => {
  let component: OrguserComponent;
  let fixture: ComponentFixture<OrguserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrguserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrguserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
