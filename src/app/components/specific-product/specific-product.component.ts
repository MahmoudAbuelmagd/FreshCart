import { Component, ElementRef, inject, OnDestroy, OnInit, Renderer2, viewChild, ViewChild } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-specific-product',
  standalone: true,
  imports: [NgIf],
  templateUrl: './specific-product.component.html',
  styleUrl: './specific-product.component.css'
})
export class SpecificProductComponent implements OnInit ,OnDestroy{
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)
  productId!: string | null;
  productSub!: Subscription;
  productDetailsImages!: any;
  productDetails!: IProduct;
  @ViewChild('mainImage') mainImage!: ElementRef
  arrOfIds !: string[] 
  constructor(){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (pInfo)=>{
        this.productId = pInfo.get('p_id');
        console.log(this.productId);
      }
      
    })
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.arrOfIds = res.data.map((item:any) => item._id)
        console.log(this.arrOfIds);
      }
    })
    
    this.productSub = this._ProductsService.getProduct(this.productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        this.productDetailsImages = res.data.images;
        console.log(res.data.images);
      },
    })
  }
  addProduct(p_id : string):void {
    this._CartService.addProductToCart(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.cartTotalNumber.next(res.numOfCartItems)
        this._ToastrService.success(res.message,'',{timeOut: 2000, positionClass: 'toast-bottom-right'})
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  addToWishlist(p_id:string) {
    this._WishlistService.addProductToWishlist(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this.arrOfIds = res.data
        this._WishlistService.wishlistWritableCount.set(res.data.length)
        this._ToastrService.success(res.message,'',{timeOut: 2000, positionClass: 'toast-bottom-right'})
      }
    })
  }
  deleteProductFromWishlist(p_id : string): void{
    this._WishlistService.removeProductfromWishlist(p_id).subscribe({
      next: (res) => {
        this.arrOfIds = res.data
        this._WishlistService.wishlistWritableCount.set(res.data.length)
        this._ToastrService.info(res.message,'',{timeOut: 2000, positionClass: 'toast-bottom-right'})
      }
    })
  }
  changeMainImg(eventInfo: any , element:HTMLImageElement) {
    let currentClickedImage = eventInfo.srcElement.src
    element.setAttribute('src', currentClickedImage)
  }
  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
  }
}
