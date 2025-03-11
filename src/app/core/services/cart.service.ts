import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartTotalNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  token:any = (typeof localStorage !== 'undefined') ? {token: localStorage.getItem('token')} : "" 
  constructor(private _HttpClient: HttpClient) {}
  getLoggedUserCart(): Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/cart`, {headers : this.token !})
  }
  addProductToCart(p_id:string): Observable<any>{
    return this._HttpClient.post( `${environment.baseURL}/api/v1/cart`, {"productId" : p_id}, {headers : this.token !})
  }
  removeProductfromCart(p_id:string): Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart/${p_id}`, {headers : this.token !})
  }
  updateProductCount(p_id:string , count:number): Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/api/v1/cart/${p_id}`,{"count": count},{headers : this.token !})
  }
  clearAllCartItems(): Observable<any>{ 
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart`, {headers : this.token !})
  }
}
