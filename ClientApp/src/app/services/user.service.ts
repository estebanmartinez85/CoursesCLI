import { Injectable } from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {Observable} from "rxjs/Observable";
import {SirenEntity} from "../DTO/SirenEntity";
import {environment} from "../../environments/environment";

@Injectable()
export class UserService extends BaseComponent {

  GetUserInfo(): Observable<SirenEntity> {
    return this.http.get<SirenEntity>(environment.apiURL + "accounts/info");
  }
}
