import { Injectable } from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import {SirenResponse} from "../DTO/sirenresponse";

@Injectable()
export class CourseService extends BaseComponent{
  public GetId(): string {
    return this.route.children[0].snapshot.paramMap.get("id");
  }
  public getCourse(id: number): Observable<SirenResponse>{
    return this.http.get<SirenResponse>(environment.apiURL + `courses/${id}`);
  }
  public NavigateTo(route: string[]){
    this.router.navigate(route);
  }
  public GetUsersInRole(role: string): Observable<SirenResponse> {
    return this.http.get<SirenResponse>(environment.apiURL + "accounts/" + role);
  }
}
