import { TestBed, inject } from '@angular/core/testing';
import { CourseService } from "./course.service";


describe('CourseServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService]
    });
  });

  it('should be created', inject([CourseService], (service: CourseService) => {
    expect(service).toBeTruthy();
  }));
});
