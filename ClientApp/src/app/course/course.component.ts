import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {SirenResponse} from "../DTO/sirenresponse";
import {environment} from "../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {CourseService} from "../services/course.service";
import {AuthService} from "../services/auth-service.service";
import {Observable} from "rxjs/Observable";
import {TypeCheckHost} from "@angular/compiler-cli/src/diagnostics/translate_diagnostics";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  protected id: string;
  protected course: SirenResponse;
  protected service: CourseService;

  Object = Object;
  constructor(courseService: CourseService){
    this.service = courseService;
  }
  ngOnInit() {
    this.id = this.service.GetId();
    this.service.getCourse(+this.id).subscribe((res)=>this.course = res);
  }

  protected IsRole(role: string): boolean {
    return this.service.auth.user.role === role;
  }
}
