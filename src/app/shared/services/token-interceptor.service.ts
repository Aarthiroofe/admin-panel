import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService, private toastr: ToastrService, public router: Router) { }
  // intercept(req, next) {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization : this.auth.getToken() ? `Bearer ${this.auth.getToken()}` : ''
      }
    });
    return next.handle(tokenizedReq).do(event => {}, err => {
              if (err instanceof HttpErrorResponse && err.status === 401) {
                  if (err.error.detail) {
                    this.toastr.error(err.error.detail);
                  }
                  if (err.error.message) {
                    this.toastr.error(err.error.message);
                  }
                  localStorage.clear();
                  this.router.navigate(['/login']);
              }
          });
  }
}
