import { Component, OnInit } from '@angular/core';
import {CourseComponent} from "../course.component";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-writer-meeting-waiting',
  templateUrl: './writer-meeting-waiting.component.html',
  styleUrls: ['./writer-meeting-waiting.component.css']
})
export class WriterMeetingWaitingComponent extends CourseComponent implements OnInit {
  private complete: boolean;
  ngOnInit() {
    this.id = this.service.GetId();
    this.service.getCourse(+this.id).subscribe((res)=>this.course = res);
  }

  private Completed(): void {
    this.service.http.patch(environment.apiURL + "courses/" + this.id + "/WriterMeetingWaiting", null).subscribe((res) => console.log("Completed"));
  }
}
