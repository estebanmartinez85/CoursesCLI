import {Component, OnInit, HostListener} from '@angular/core';
import {AuthService} from "./services/auth-service.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private http: HttpClient;
  private auth: AuthService;
  private router: Router;
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
  }
  constructor(http: HttpClient, auth: AuthService, router: Router){
    this.http = http;
    this.auth = auth;
    this.router = router;
  }
  ngOnInit() {
    this.router.navigate(['/'])
  }
}
