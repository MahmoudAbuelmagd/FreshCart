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
  verfiyEmailApi(emailObject:object): Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/forgotPasswords`, emailObject)
  }
  verfiyCodeApi(codeObject:object): Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/verifyResetCode`, codeObject)
  }
  resetPassword(resetPassObj: object): Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/api/v1/auth/resetPassword`, resetPassObj)
  }
  getDecodedToken(): any{
    if (localStorage.getItem('token') != null) {
      this.decodedToken = jwtDecode(localStorage.getItem('token')!)
      console.log(this.decodedToken);
      return this.decodedToken;
    }
  }
  
}
