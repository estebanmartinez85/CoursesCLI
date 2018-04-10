import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SirenResponse} from "../DTO/sirenresponse";
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
    console.log("PARENT CONSTRUCTOR");
    this.id = this.service.GetId();
    this.service.getCourse(+this.id).subscribe(
      (res)=>{
        this.course = res;
        this.status = res.properties.status;
        this.action = res.actions[0];
        if(res.entities){
          console.log("entitities");
          this.users =  res.entities.filter(x => x.class[0] === "user");



          console.log(this.users)

        }
      });
    this.content = LibrariesComponent;
  }
public updateUsers(e: any){
    console.log("UPDATE USERSSSSS" + e);
}
  public ngOnInit() {
    console.log("PARENT INIT");
    // this.id = this.service.GetId();
    // this.service.getCourse(+this.id).subscribe(
    //   (res)=>{
    //     this.course = res;
    //     this.status = res.properties.status;
    //     this.action = res.actions[0];
    //     if(res.entities){
    //       this.users =  res.entities.filter(x => x.class[0] === "user");
    //     }
    //   });
  }
  public c(){
    console.log(this.users);
  }

  gotoCourse(course: SirenResponse, actionName: string, body: any){
    let action: Action = this.course.actions.filter((x) => x.name == actionName)[0];
    this.service.http.patch<SirenResponse>(action.href, body)
      .subscribe(
        (res) => {
          this.service.router.navigate([`course/${course.properties.id}/`, `${res.properties.status}`],
            { replaceUrl: true })
        })
  }

  protected IsRole(role: string): boolean {
    return this.service.auth.user.role === role;
  }
}
