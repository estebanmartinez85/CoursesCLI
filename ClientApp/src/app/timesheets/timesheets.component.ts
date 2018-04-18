import { Component, OnInit } from '@angular/core';
import {TimesheetService} from "../services/timesheet.service";
import {SirenEntity} from "../DTO/SirenEntity";
import moment = require("moment");

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css']
})
export class TimesheetsComponent implements OnInit {
  private service: TimesheetService;
  private users: SirenEntity;
  private user;
  private timesheet: SirenEntity;
  private rows;
  private courses;
  private tasks;
  private dates: string[] = [];
  private total;
  Object = Object;
  private course: string;

  constructor(service: TimesheetService) {
    this.service = service;
  }

  ngOnInit() {
    this.service.GetAssignableUsers().subscribe(res => {this.users = res; console.log(this.users)});

  }

  SayName() {
    this.timesheet = null;
    this.dates = [];
    this.service.GetTimesheet(this.user).subscribe(res => {
      this.timesheet = res;
      this.rows = res.entities.filter(x => x.class[0] == "timesheetrow")[0];
      this.courses = res.entities.filter(x => x.class[0] == "course")[0];
      this.tasks = res.entities.filter(x => x.class[0] == "timesheetstask")[0];
      let dt = moment(res.properties.beginDate);
      for(let i = 0; i < 7; i++){

        this.dates.push(dt.format("l"));
        dt.add(1, 'd');
      }
      this.CalculateTotal();
    });
  }

  FindCourse(id){
    let t = this.courses.entities.filter(c => c.properties.id == id)[0];
    return t.properties.title;
  }
  FindTask(id){
    let t = this.tasks.entities.filter(c => c.properties.id == id)[0];
    return t.properties.name;
  }

  private CalculateTotal() {
    let total = 0;
    for(let i of this.rows.entities){
      for (let n of i.properties.times) {
        total += parseFloat(n);
      }
    }

    this.total = total;
  }
}
