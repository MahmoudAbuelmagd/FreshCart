import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private _HttpClient: HttpClient) { }
  token: any = (typeof localStorage !== 'undefined') ? { token: localStorage.getItem('token') } : "";
  getCheckoutSession(details:object, cartID: string): Observable<any>{
    return this._HttpClient.post(
      `${environment.baseURL}/api/v1/orders/checkout-session/${cartID}?url=${environment.serverURL}`,
      {details}, {headers : this.token !})
  }
  getAllOrders(userId:string): Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/orders/user/${userId}`);
  }
}
