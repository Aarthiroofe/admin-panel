import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
const baseUrl: any = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
    isLogin() {
      return !!localStorage.getItem('token');
    }
    getToken() {
      return localStorage.getItem('token');
    }
    username() {
      return localStorage.getItem('username');
    }
    getOrgId() {
      return localStorage.getItem('org_id');
    }
    
}
