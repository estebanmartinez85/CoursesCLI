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
    this.id = this.service.GetId();
    this.service.getCourse(+this.id).subscribe((res)=>this.course = res);
    this.GetWriters();
  }

  private GetWriters(): void {
    this.service.GetUsersInRole("writer").subscribe((res) => { this.writers = res; });
  }
  private AssignWriter(): void {

    let action: Action = this.course.actions.filter((x) => x.name == "assign-writer")[0];
    this.service.http.patch(action.href, { writerId: this.writer }).subscribe((res) => console.log(res));

  }
}
