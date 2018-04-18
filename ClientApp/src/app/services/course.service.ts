import { Injectable } from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import {SirenEntity} from "../DTO/SirenEntity";
import {Action} from "../DTO/action";

@Injectable()
export class CourseService extends BaseComponent{
  public GetId(): string {
    return this.route.children[0].snapshot.paramMap.get("id");
  }
  public getCourse(id: number): Observable<SirenEntity>{
    return this.http.get<SirenEntity>(environment.apiURL + `courses/${id}`);
  }

  public GetAssignedCourses(): Observable<SirenEntity>{
    return this.http.get<SirenEntity>(environment.apiURL + 'courses');
  }

  public Delete(id:number): Observable<any> {
    return this.http.delete(environment.apiURL + "courses/" + id);
  }

  public NavigateTo(route: string[]){
    this.router.navigate(route, { skipLocationChange: true });
  }
  public GetUsersInRole(role: string): Observable<SirenEntity> {
    return this.http.get<SirenEntity>(environment.apiURL + "accounts/" + role);
  }

  public ProcessAction(course: SirenEntity, actionName: string, body: any){
    let action: Action = course.actions.filter((x) => x.name == actionName)[0];
    this.http.patch<SirenEntity>(action.href, body)
      .subscribe(

        (res) => {
          this.router.navigateByUrl(`course/${course.properties.id}/${res.properties.status}`, { skipLocationChange: true });
        })
  }
}
