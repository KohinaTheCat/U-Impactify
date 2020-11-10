import { TestBed } from '@angular/core/testing';

import { AssessmentService } from './Assessment.service';

describe('CourseService', () => {
  let service: AssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
 
