import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {  

  constructor(private _HttpClient: HttpClient) { }
  getProducts(pageSize:number = 1): Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/products?page=${pageSize}`)
  }
  getProduct(id:string|null): Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/products/${id}`);
  }
}
