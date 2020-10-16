import { TestBed } from '@angular/core/testing';

import { CreateCourseService } from './create-course.service';

describe('CreateCourseService', () => {
  let service: CreateCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
