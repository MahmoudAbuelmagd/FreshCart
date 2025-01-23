import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ RouterLink, SearchPipe, FormsModule ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsSub!: Subscription;
  products!: IProduct[];
  arrIds: string[] = [];
  searchValue: string = '';
  constructor(private _ProductsService: ProductsService,
    private _ProductDetailsService: ProductDetailsService,
    private _CartService: CartService,
    private _ToastrService:ToastrService,
    private _WishlistService: WishlistService,
  ) { }
  ngOnInit(): void {
    this.productsSub = this._ProductsService.getProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data;
      }
    })
    if (this._ProductDetailsService.productDetails) {
      this._ProductDetailsService.ngOnInit()
    }
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.arrIds = res.data.map((item:any)=> item._id)
      },
      error:(err)=>{console.log(err);
      }
    })
  }
  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
    this._ProductDetailsService.ngOnDestroy()
  }
  addProduct(p_id : string):void {
    this._CartService.addProductToCart(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message,'',{timeOut: 2000, positionClass: 'toast-bottom-right'})
        this._CartService.cartTotalNumber.next(res.numOfCartItems)
      }
    })
  }
  addToWishlist(p_id: string):void {
    this._WishlistService.addProductToWishlist(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message,'',{timeOut: 2000, positionClass: 'toast-bottom-right'})
        this.arrIds = res.data
        this._WishlistService.wishlistWritableCount.set(res.data.length)
        
      }
    })
  }
  removeFromWishlist(p_id: string):void {
    this._WishlistService.removeProductfromWishlist(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.warning(res.message, '', { timeOut: 2000, positionClass: 'toast-bottom-right' })
        this.arrIds = res.data
        this._WishlistService.wishlistWritableCount.set(res.data.length)
      }
    })
  }
}
