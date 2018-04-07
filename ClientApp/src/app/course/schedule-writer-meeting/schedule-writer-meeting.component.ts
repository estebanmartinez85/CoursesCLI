import { Component, OnInit } from '@angular/core';
import {CourseComponent} from "../course.component";

@Component({
  selector: 'app-schedule-writer-meeting',
  templateUrl: './schedule-writer-meeting.component.html',
  styleUrls: ['./schedule-writer-meeting.component.css']
})
export class ScheduleWriterMeetingComponent extends CourseComponent implements OnInit {
  private date: string = "2018-04-11T01:00";

  ngOnInit() {
    this.id = this.service.GetId();
    this.service.getCourse(+this.id).subscribe((res)=>this.course = res);
  }

  private ScheduleMeeting(date: string){
    const href: string = ((this.course.actions
      .filter((x) => x.name == "schedule-writer-meeting")[0])).href;
    this.service.http.patch(href, { date: this.date }).subscribe((res) => console.log(res));
  }
}
