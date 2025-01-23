import { CategoriesService } from './../../core/services/categories.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
  
export class HomeComponent implements OnInit, OnDestroy{
  constructor(
    private _ProductsService: ProductsService,
    private _CategoriesService: CategoriesService,
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _ToastrService:ToastrService) { }
  productsSub!: Subscription;
  categoriesSub!: Subscription;
  productData!: IProduct[];
  categoriesData!: ICategory[];
  numOfCartItems: number = 0;
  arrIds: string[] = [];
  staticSliderOptions: OwlOptions = {
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
    this.productsSub = this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.productData = res.data.slice(0, 20);
        // this._NgxSpinnerService.hide()
      },

    })
    this.categoriesSub = this._CategoriesService.getCats().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesData = res.data;
      }
    })
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.arrIds = res.data.map((item: any) => item._id);
        console.log(this.arrIds);
        
      }
    })
  }
  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
    this.categoriesSub?.unsubscribe();
  }
  addProduct(p_id : string):void {
    this._CartService.addProductToCart(p_id).subscribe({
      next: (res) => {
        this.numOfCartItems = res.numOfCartItems;
        this._CartService.cartTotalNumber.next(res.numOfCartItems)
        this._ToastrService.success(res.message,'',{timeOut: 2000, positionClass: 'toast-bottom-right'})
        console.log(res);
      },
      
    })
  }
  addProductWishlist(p_id: string): void{
    this._WishlistService.addProductToWishlist(p_id).subscribe({
      next: (res) => {
        this.arrIds = res.data
        console.log(res);
        this._WishlistService.wishlistWritableCount.set(res.data.length)
      },
      
    })
  }
  removeProductWishlist(p_id: string) {
    this._WishlistService.removeProductfromWishlist(p_id).subscribe({
      next: (res) => {
        this.arrIds = res.data
        console.log(this.arrIds);
        this._ToastrService.error(res.message,'',{timeOut: 2000, positionClass: 'toast-bottom-right'})
        this._WishlistService.wishlistWritableCount.set(res.data.length)
      }
    })
  }
}
