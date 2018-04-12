import { Component, OnInit } from '@angular/core';
import { SirenResponse } from "../DTO/sirenresponse";
import {Entity} from "../DTO/entity";
import {Action} from "../DTO/action";
import {environment} from "../../environments/environment";
import {BaseComponent} from "../base/base.component";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth-service.service";
import {CourseService} from "../services/course.service";
import {relativeToRootDirs} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent extends BaseComponent implements OnInit  {
  private courses: SirenResponse;
  protected courseService: CourseService;
  Object = Object;

  ngOnInit() {
    this.GetCourses();
  }

  public GetCourses(){
    this.http.get<SirenResponse>(environment.apiURL + 'courses')
      .subscribe(result => { this.courses = result; },
                 error => console.error(error));
  }

  public GoToCourse(id: number, status: string){
      this.router.navigate( [`course/${id}/`, status], { skipLocationChange: true });
  }

  public DeleteCourse(id:number): void {
    this.http.delete(environment.apiURL + "courses/" + id)
      .subscribe((res)=> this.GetCourses());
  }
  public AddCourse(action: Action): void {
    let body: any = {};
    for (let ff of action.fields) {
      body[ff.name] = (<HTMLInputElement>document.getElementById(`field-${ff.name}`)).value;
    }
    this.http.post(action.href, body).subscribe((res) => this.GetCourses());
  }

  SplitPascal(status) {
    return status.replace(/(?!^)([A-Z])/g, " $1");
  }
}
