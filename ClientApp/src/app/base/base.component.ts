import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth-service.service";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  public auth: AuthService;
  public http: HttpClient;
  public router: Router;
  public route: ActivatedRoute;
  constructor(http:HttpClient, auth: AuthService, router: Router, route: ActivatedRoute ) {
    this.http = http;
    this.auth = auth;
    this.router = router;
    this.route = route;
  }
  ngOnInit() {
  }

}
