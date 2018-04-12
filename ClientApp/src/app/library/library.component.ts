import { Component, OnInit } from '@angular/core';
import {SirenResponse} from "../DTO/sirenresponse";
import {LibraryService} from "../services/library.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  protected id: string;
  protected library: SirenResponse;
  protected service: LibraryService;
  Object = Object;

  constructor(libraryService: LibraryService){
    this.service = libraryService;
  }

  ngOnInit() {
    this.id = this.service.GetId();
    this.GetLibrary();
  }

  private GetLibrary(): void{
    this.service.getLibrary(+this.id)
      .subscribe((library) => { this.library = library });
  }

  private GoToCourse(id: number, status: string){
      this.service.router.navigate( [`course/${id}`, `${status}`]);
  }
  public DeleteCourse(id:number): void {
    this.service.http.delete(environment.apiURL + "courses/" + id)
      .subscribe((res)=> this.GetLibrary());
  }
  SplitPascal(status) {
    return status.replace(/(?!^)([A-Z])/g, " $1");
  }
}
