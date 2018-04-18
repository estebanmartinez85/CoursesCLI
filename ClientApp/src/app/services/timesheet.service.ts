import { Injectable } from '@angular/core';
import {SirenEntity} from "../DTO/SirenEntity";
import {BaseComponent} from "../base/base.component";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";

@Injectable()
export class TimesheetService extends BaseComponent {
  public GetCurrentUserTimesheet(): Observable<SirenEntity> {
    return this.http.get<SirenEntity>(environment.apiURL + "timesheets" );
  }

  public GetTimesheet(userId:string): Observable<SirenEntity>{
    return this.http.get<SirenEntity>(environment.apiURL + `timesheets/user/${userId}`);
  }

  public Save(timesheetId:string,  entities: SirenEntity[]): Observable<SirenEntity> {
    const rows = entities.map(function(e) {
     return { courseId: e.properties.courseId, taskId: e.properties.taskId, times: e.properties.times }
    });

    return this.http.post<SirenEntity>(environment.apiURL + `timesheets/${timesheetId}/row`,
        rows);
  }

  GetAssignableUsers(): Observable<SirenEntity> {
    return this.http.get<SirenEntity>(environment.apiURL + "accounts/assignable");
  }
}
