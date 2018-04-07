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
  protected _libraryService: LibraryService;
  Object = Object;

  constructor(libraryService: LibraryService){
    this._libraryService = libraryService;
  }

  ngOnInit() {
    this.id = this._libraryService.GetId();
    this._libraryService.getLibrary(+this.id)
      .subscribe((library) => { this.library = library });
  }

  private RowClick(id: number){
    this._libraryService.NavigateTo(['course/'+id]);
  }
}
