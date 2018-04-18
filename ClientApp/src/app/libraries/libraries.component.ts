import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {SirenEntity} from "../DTO/SirenEntity";
import {LibraryService} from "../services/library.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.css']
})
export class LibrariesComponent implements OnInit {
  public libraries : SirenEntity;
  private service: LibraryService;
  private router: Router;
  Object = Object;

  constructor(service: LibraryService, router: Router){
    this.service = service;
    this.router = router;
  }

  ngOnInit() {
    if (!this.libraries) {
      this.LoadLibraries();
    }
  }

  public LoadLibraries(): void {
    this.service.GetLibraries().subscribe(result => {
        this.libraries = result;
      },
      error => console.error(error));
  }

  public DeleteLibrary(id: number){
    this.service.Delete(id).subscribe(res => this.LoadLibraries());
  }
}
