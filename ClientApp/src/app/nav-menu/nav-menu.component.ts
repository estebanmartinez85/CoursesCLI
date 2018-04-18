import { Component } from '@angular/core';
import {AuthService} from "../services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent  {
  isExpanded = false;
  private auth: AuthService;
  private router: Router;

  constructor(auth: AuthService, router: Router){
    this.auth = auth;
    this.router = router;
  }

  public getAuth(): AuthService {
    return this.auth;
  }

  public Logout(): void{
    this.router.navigate(['/auth']);
    this.auth.logout();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
