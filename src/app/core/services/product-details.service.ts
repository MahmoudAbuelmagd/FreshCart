import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor() { }
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  productId!: string | null;
  productSub!: Subscription;
  productDetailsImages!: any;
  productDetails!: IProduct;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (pInfo)=>{
        this.productId = pInfo.get('p_id');
        console.log(this.productId);
      }
    })

    this.productSub = this._ProductsService.getProduct(this.productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        this.productDetailsImages = res.data.images;
        console.log(res.data.images);
      },
      error: (error) => {
        console.log(error);
      },
    })
  }
  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
  }

}
