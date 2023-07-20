import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  export class LoginGuard implements CanActivate {
  
  
    constructor(private router: Router) {
    }
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('token') != null)
        return true;
      else {
        this.router.navigate(['/user/login']);
        return false;
      }
  
    }
}