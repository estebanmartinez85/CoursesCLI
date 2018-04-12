import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth-service.service";
import {BaseComponent} from "../base/base.component";
import {environment} from "../../environments/environment";
import {SirenResponse} from "../DTO/sirenresponse";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LibraryService extends BaseComponent{
  public GetId(): string {
    return this.route.children[0].snapshot.paramMap.get("id");
  }
  public getLibrary(id: number): Observable<SirenResponse>{
    return this.http.get<SirenResponse>(environment.apiURL + `libraries/${id}`);
  }
  public NavigateTo(route: string[]){
    this.router.navigate(route);
  }
}
