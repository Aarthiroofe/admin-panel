import { TestBed, async, inject } from '@angular/core/testing';

import { LoginredirectGuard } from './loginredirect.guard';

describe('LoginredirectGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginredirectGuard]
    });
  });

  it('should ...', inject([LoginredirectGuard], (guard: LoginredirectGuard) => {
    expect(guard).toBeTruthy();
  }));
});
