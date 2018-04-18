import { Component, OnInit } from '@angular/core';
import { SirenEntity } from "../DTO/SirenEntity";
import {CourseService} from "../services/course.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit  {
  private courses: SirenEntity;
  private service: CourseService;
  private router: Router;
  Object = Object;

  constructor(service: CourseService, router: Router){
    this.service = service;
    this.router = router;
  }

  ngOnInit() {
    this.GetAssignedCourses();
  }

  public GetAssignedCourses(){
      this.service.GetAssignedCourses().subscribe(entity => { this.courses = entity; },
                 error => console.error(error));
  }

  public GoToCourse(id: number, status: string){
      this.router.navigate( [`course/${id}/`, status], { skipLocationChange: true });
  }

  public DeleteCourse(id:number): void {
    this.service.Delete(id).subscribe((res)=> this.GetAssignedCourses());
  }

  SplitPascal(status) {
    return status.replace(/(?!^)([A-Z])/g, " $1");
  }
}
