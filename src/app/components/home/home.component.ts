import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';
import { IProduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { unSub } from '../../shared/unSub.class';
import { CategoriesService } from './../../core/services/categories.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
  
export class HomeComponent extends unSub implements OnInit{
  productData!: IProduct[];
  categoriesData!: ICategory[];
  numOfCartItems: number = 0;
  arrIds: string[] = [];
  constructor(
    private _ProductsService: ProductsService,
    private _CategoriesService: CategoriesService,
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _ToastrService: ToastrService) { 
      super()
    }
  staticSliderOptions: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    navText: ['', ''],
    autoplayTimeout:3000,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  dynamicSliderOptions: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    dotsEach:true,
    rewind:true,
    navSpeed: 700,
    autoplay: true,
    navText: ['', ''],
    autoplayTimeout:3000,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1140: {
        items: 5
      }
    },
    nav: true
  }
  ngOnInit(): void {
    // this._NgxSpinnerService.show()
    this._ProductsService.getProducts().pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        this.productData = res.data.slice(0, 20);
        // this._NgxSpinnerService.hide()
      },

    })
    this._CategoriesService.getCats().pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesData = res.data;
      }
    })
    this._WishlistService.getLoggedUserWishlist().pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        this.arrIds = res.data.map((item: any) => item._id);
        console.log(this.arrIds);
        
      }
    })
  }

  addProduct(p_id : string):void {
    this._CartService.addProductToCart(p_id).pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        this.numOfCartItems = res.numOfCartItems;
        this._CartService.cartTotalNumber.next(res.numOfCartItems)
        this._ToastrService.success(res.message,'',{timeOut: 2000, positionClass: 'toast-bottom-right'})
        console.log(res);
      },
      
    })
  }
  addProductWishlist(p_id: string): void{
    this._WishlistService.addProductToWishlist(p_id).pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        this.arrIds = res.data
        console.log(res);
        this._WishlistService.wishlistWritableCount.set(res.data.length)
      },
      
    })
  }
  removeProductWishlist(p_id: string) {
    this._WishlistService.removeProductfromWishlist(p_id).pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        this.arrIds = res.data
        console.log(this.arrIds);
        this._ToastrService.error(res.message,'',{timeOut: 2000, positionClass: 'toast-bottom-right'})
        this._WishlistService.wishlistWritableCount.set(res.data.length)
      }
    })
  }
}
