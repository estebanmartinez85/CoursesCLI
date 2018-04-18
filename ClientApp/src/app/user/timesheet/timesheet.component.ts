import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../../services/timesheet.service';
import { SirenEntity } from "../../DTO/SirenEntity";
import moment = require("moment");
import {Moment} from "moment";


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  private timesheet: SirenEntity;
  private rows;
  private id;
  private courses;
  private course;
  private tasks;
  private task;
  private dates: string[] = [];
  private total = 0;
  private service: TimesheetService;
  Object =  Object;

  constructor(service: TimesheetService){
    this.service = service;
  }

  ngOnInit() {
    this.LoadTimeSheet();

  }

  private LoadTimeSheet(): void {
    this.service.GetCurrentUserTimesheet()
      .subscribe(entity => {
        this.timesheet = entity;
        this.id = entity.properties.id;

        this.rows = entity.entities.filter(x => x.class[0] == "timesheetrow")[0];
        this.courses = entity.entities.filter(x => x.class[0] == "course")[0];
        this.tasks = entity.entities.filter(x => x.class[0] == "timesheetstask")[0];

        if (this.rows.entities === undefined) this.rows.entities = [];

        let dt = moment(entity.properties.beginDate);
        for(let i = 0; i < 7; i++){

          this.dates.push(dt.format("l"));
          dt.add(1, 'd');
        }
        console.log(this.rows);
        this.CalculateTotal();
      });
  }
  AddRow(){
    this.rows.entities.push({ class: ["timesheetrow"],  properties:{courseId:null,  trackId:null,  times:[0,0,0,0,0,0,0], totalHours: 0}, rel:["row"]});
  }
  SaveTimesheet() {
    this.service.Save(this.timesheet.properties.id, this.rows.entities).subscribe(x => console.log(x));
  }

  private Sum(times): number {
    let t = times.map(x => parseInt(x));
    let sum = t.reduce((a, b) => a + b, 0);
    return sum;
  }

  private OnChange(f): void {
    if (f.properties.times.some(t => t == null || t == "")){
      console.log("NULL!!");
    }

    let sum = this.Sum(f.properties.times);
    f.properties.totalHours = sum;
    this.CalculateTotal();
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

  RemoveRow(f) {
    this.rows.entities.splice(f, 1);
    this.CalculateTotal();
  }
}
