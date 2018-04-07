import { Component } from '@angular/core';
import {AuthService} from "../services/auth-service.service";
import {BaseComponent} from "../base/base.component";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent extends BaseComponent {
  isExpanded = false;

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
