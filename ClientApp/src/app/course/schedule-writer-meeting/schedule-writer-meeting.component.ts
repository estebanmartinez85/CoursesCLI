import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CourseComponent} from "../course.component";
import {SirenResponse} from "../../DTO/sirenresponse";

@Component({
  selector: 'app-schedule-writer-meeting',
  templateUrl: './schedule-writer-meeting.component.html',
  styleUrls: ['./schedule-writer-meeting.component.css']
})
export class ScheduleWriterMeetingComponent extends CourseComponent implements OnInit {
  private date: string = "2018-04-11T01:00";
}
