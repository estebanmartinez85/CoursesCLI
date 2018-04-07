import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private username: string;
  private password: string;
  protected auth: AuthService;
  protected http: HttpClient;
  protected router: Router;

  constructor(http:HttpClient, auth: AuthService, router: Router) {
    this.http = http;
    this.auth = auth;
    this.router = router;
  }

  ngOnInit() {
  }

  public async Login(){
    this.auth.login(this.username, this.password,
      (res) => {
        this.router.navigate(['/']); });
  }

  public Logout(): void{
    this.auth.logout();
  }

  public IsLoggedOut(): boolean {
    return this.auth.isLoggedOut();
  }
  public IsLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
