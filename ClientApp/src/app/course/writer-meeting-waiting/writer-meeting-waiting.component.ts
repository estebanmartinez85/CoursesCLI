import { Component, OnInit } from '@angular/core';
import {CourseComponent} from "../course.component";
import {environment} from "../../../environments/environment";
import {SirenEntity as SirenResponse} from "../../DTO/SirenEntity";

@Component({
  selector: 'app-writer-meeting-waiting',
  templateUrl: './writer-meeting-waiting.component.html',
  styleUrls: ['./writer-meeting-waiting.component.css']
})
export class WriterMeetingWaitingComponent extends CourseComponent implements OnInit {
  private complete: boolean;
}
