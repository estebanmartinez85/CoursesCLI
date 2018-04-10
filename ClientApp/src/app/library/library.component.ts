import { Component, OnInit } from '@angular/core';
import {SirenResponse} from "../DTO/sirenresponse";
import {LibraryService} from "../services/library.service";

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
    this.service.getLibrary(+this.id)
      .subscribe((library) => { this.library = library });
  }

  private GoToCourse(id: number, status: string){
      this.service.router.navigate( [`course/${id}`, `${status}`]);
  }
}
