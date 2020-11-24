import { TestBed } from '@angular/core/testing';

import { TypeGuard } from './type.guard';

describe('TypeGuard', () => {
  let guard: TypeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TypeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
