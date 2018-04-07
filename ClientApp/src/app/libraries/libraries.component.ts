import { Component, OnInit } from '@angular/core';
import {AuthComponent} from "../auth/auth.component";
import {BaseComponent} from "../base/base.component";
import {environment} from "../../environments/environment";
import {SirenResponse} from "../DTO/sirenresponse";
import {Action} from "../DTO/action";

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.css']
})
export class LibrariesComponent extends BaseComponent implements OnInit {
  public libraries : SirenResponse;
  Object = Object;
  ngOnInit() {
    if (!this.libraries)
      this.GetLibraries();

  }

  private GetLibraries(): void {
    this.http.get<SirenResponse>(environment.apiURL + 'libraries')
      .subscribe(result => { this.libraries = result; },
                 error => console.error(error));
  }
  private AddLibrary(): void {
    console.log("GO TO ADD LIBRARY PAGE");
  }
  public DeleteLibrary(id: number){
    this.http.delete(environment.apiURL + 'libraries/' + id).subscribe(res => this.GetLibraries());
  }

  private RowClick(id: number){
    this.router.navigate(['library/'+id]);
  }


  protected GoTo(path: string): void {
    this.router.navigate([path]);
  }
}
