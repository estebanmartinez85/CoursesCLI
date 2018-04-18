import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth-service.service";
import {BaseComponent} from "../base/base.component";
import {environment} from "../../environments/environment";
import {SirenEntity} from "../DTO/SirenEntity";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LibraryService extends BaseComponent {
  public GetParentId(): string {
    return this.route.children[0].snapshot.paramMap.get("id");
  }
  public getLibrary(id: number): Observable<SirenEntity>{
    return this.http.get<SirenEntity>(environment.apiURL + `libraries/${id}`);
  }
  public NavigateTo(route: string[]){
    this.router.navigate(route);
  }

  public GetLibraries(): Observable<SirenEntity> {
    return this.http.get<SirenEntity>(environment.apiURL + 'libraries');
  }

  public Delete(id: number): Observable<any>{
    return this.http.delete(environment.apiURL + 'libraries/' + id);
  }
}
