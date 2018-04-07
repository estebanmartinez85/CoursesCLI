import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import moment = require("moment");
import {environment} from "../../environments/environment";
import { Token } from "../interfaces/token";
import {User} from "../entities/User";

@Injectable()
export class AuthService {
  public user: User;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("user")){
      this.user = JSON.parse(localStorage.getItem("user")) as User;
    }
  }

  login(email:string, password:string, callback: Function = ()=>{} ) {
    localStorage.removeItem("user");
    return this.http.post<Token>(environment.apiURL + 'Accounts/Login',
      {email, password}).subscribe(
      (res) => {
        this.user = new User(res.firstName, res.role);
        localStorage.setItem("user", JSON.stringify(this.user));
        this.setSession(res);
        callback(res);
      });
  }

  private setSession(authResult: Token) {

    const expiresAt = moment().add(authResult.expiresIn,'second');
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
