import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  decodedToken: any;
  loggedUser: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private _HttpClient: HttpClient) { }
  postUser(userData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signup`, userData)
  }
  loginUser(loginData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signin`, loginData)
  }
  getDecodedToken(): any{
    if (sessionStorage.getItem('token') != null) {
      this.decodedToken = jwtDecode(sessionStorage.getItem('token')!)
      console.log(this.decodedToken);
      return this.decodedToken;
    }
  }
}
