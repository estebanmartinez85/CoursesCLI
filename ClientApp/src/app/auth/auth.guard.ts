import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../services/auth-service.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  private auth: AuthService;
  private router: Router;

  constructor(auth: AuthService, router: Router){
    this.auth = auth;
    this.router = router;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.auth.isLoggedOut()) {
      this.router.navigate(["/auth"]);
    }

    if (next.data["role"] !== undefined) {
      console.log(next.data["role"]);
      let role = next.data["role"] as string;
      if (role !== this.auth.user.role)
        return false;
    }

    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (childRoute.data["role"] !== undefined) {
      console.log(childRoute.data["role"]);
      let role = childRoute.data["role"] as string;
      if (role !== this.auth.user.role)
        return false;
    }
    return ;
  }
}
