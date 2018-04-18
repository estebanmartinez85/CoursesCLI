import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SirenEntity as SirenResponse} from "../DTO/SirenEntity";
import {CourseService} from "../services/course.service";
import { Location } from '@angular/common';
import {Action} from "../DTO/action";
import {LibrariesComponent} from "../libraries/libraries.component";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  content
  protected id: string;
  protected course: SirenResponse;
  protected users;
  protected action;
  protected status;
  protected service: CourseService;

  Object = Object;
  constructor(courseService: CourseService, ){
    this.service = courseService;
    this.id = this.service.GetId();
  }

  onActivate(component) {
  }

  onDeactivate(component) {
    this.ngOnInit();
  }
  public ngOnInit() {
    this.course = null;
    this.service.getCourse(+this.id).subscribe(
      (res)=>{
        this.course = res;
        this.status = res.properties.status;

        if (res.actions) {
          this.action = res.actions[0];
        }
        if(res.entities){
          this.users =  res.entities.filter(x => x.class[0] === "user");
        }
      });
  }

  gotoCourse(course: SirenResponse, actionName: string, body: any){
    let action: Action = this.course.actions.filter((x) => x.name == actionName)[0];
    this.service.http.patch<SirenResponse>(action.href, body)
      .subscribe(
        (res) => {
          this.service.router.navigate([`course/${course.properties.id}/`, `${res.properties.status}`],
            { skipLocationChange: true })

        })
  }
  SplitPascal(status) {
    return status.replace(/(?!^)([A-Z])/g, " $1");
  }
  protected IsRole(role: string): boolean {
    return this.service.auth.user.role === role;
  }
}
