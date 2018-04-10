import { Component, OnInit } from '@angular/core';
import {LibraryComponent} from "../library.component";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-library-add',
  templateUrl: './library-add.component.html',
  styleUrls: ['./library-add.component.css']
})
export class LibraryAddComponent extends LibraryComponent implements OnInit {
  private title: string;
  ngOnInit() {
  }
  private AddLibrary(){
    console.log(this.title);
    this.service.http.post(environment.apiURL + 'libraries/', { Title: this.title }).subscribe((res) => this.service.NavigateTo(['libraries']));
  }
}
