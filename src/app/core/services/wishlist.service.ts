import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistWritableCount: WritableSignal<number> = signal(0);
  constructor(private _HttpClient:HttpClient) { }
  getLoggedUserWishlist(): Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/wishlist`)
  }
  addProductToWishlist(p_id:string): Observable<any>{
    return this._HttpClient.post( `${environment.baseURL}/api/v1/wishlist`, {"productId" : p_id})
  }
  removeProductfromWishlist(p_id:string): Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/wishlist/${p_id}`)
  }
}
