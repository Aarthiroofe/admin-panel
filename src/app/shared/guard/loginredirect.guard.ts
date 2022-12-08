import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class LoginredirectGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   if(!this.auth.isLogin()) {
      localStorage.clear();
      return true;
      
   }
   else{
    return false;
   }
  }
}
