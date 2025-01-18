import { Component, ElementRef, inject, OnDestroy, OnInit, Renderer2, viewChild, ViewChild } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-specific-product',
  standalone: true,
  imports: [],
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
  constructor(private _Renderer2:Renderer2){}
  // ngAfterViewInit(): void {
      
  //     console.log(this.mainImage);
  //     this._Renderer2.listen(this.mainImage.nativeElement, 'click', (event) => {
  //       let currentClickedImg = event.target
  //       console.log(currentClickedImg);
  //     })
  //   }
    
    
  // }
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
        this._ToastrService.success(res.message,'',{timeOut: 2000, positionClass: 'toast-bottom-right'})
      },
      error:(err)=>{console.log(err);
      },
    })
  }
  changeMainImg(eventInfo: any , element:HTMLImageElement) {
    let currentClickedImage = eventInfo.srcElement.src
    element.setAttribute('src', currentClickedImage)
  }
}
