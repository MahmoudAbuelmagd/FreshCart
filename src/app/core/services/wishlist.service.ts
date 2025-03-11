import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistWritableCount: WritableSignal<number> = signal(0);
  token:any = (typeof localStorage !== 'undefined') ? {token: localStorage.getItem('token')} : "" 
  constructor(private _HttpClient:HttpClient) { }
  getLoggedUserWishlist(): Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/wishlist`, {headers : this.token !})
  }
  addProductToWishlist(p_id:string): Observable<any>{
    return this._HttpClient.post( `${environment.baseURL}/api/v1/wishlist`, {"productId" : p_id}, {headers : this.token !})
  }
  removeProductfromWishlist(p_id:string): Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/wishlist/${p_id}`, {headers : this.token !})
  }
}
