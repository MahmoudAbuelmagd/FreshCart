import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly _HttpClient = inject(HttpClient);
  constructor() { }
  getCats(): Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/categories`)
  }
  getSubCats(): Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/subcategories`);
  }
}
