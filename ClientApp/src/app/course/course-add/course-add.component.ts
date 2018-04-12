import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {CourseComponent} from "../course.component";

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent extends CourseComponent implements OnInit {
  private code: string;
  private title: string;
  private libraryId: string;

  ngOnInit() {
    this.libraryId = this.service.route.snapshot.children[0].paramMap.get('libraryid');
  }
  private AddCourse(){
    this.service.http.post(environment.apiURL + 'courses/',
      { code: this.code, title: this.title, libraryId: this.libraryId })
      .subscribe((res) => this.service.NavigateTo(['library/'+this.libraryId]));
  }
}
