import { Component, OnInit } from '@angular/core';
import {SirenResponse} from "../../DTO/sirenresponse";
import {CourseComponent} from "../course.component";
import {Action} from "../../DTO/action";

@Component({
  selector: 'app-assign-writer',
  templateUrl: './assign-writer.component.html',
  styleUrls: ['./assign-writer.component.css']
})
export class AssignWriterComponent extends CourseComponent implements OnInit {
  private writers: SirenResponse;
  private writer: string;
  ngOnInit() {
    super.ngOnInit();
    this.GetWriters();
  }

  private GetWriters(): void {
    this.service.GetUsersInRole("writer").subscribe((res) => { this.writers = res; });
  }

}
