import { Component, inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { CurrencyPipe, Location } from '@angular/common';
import { IWishlist } from '../../core/interfaces/iwishlist';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishlistData!: IWishlist[] | null;
  wishlistCount!: number;
  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _location = inject(Location)
  ngOnInit(): void{
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistData = res.data
      }
    })
  }
  
  deleteProductFromWishlist(p_id : string): void{
    this._WishlistService.removeProductfromWishlist(p_id).subscribe({
      next: (res) => {
        console.log(res); // give id's of products
        this._WishlistService.getLoggedUserWishlist().subscribe({
          next: (res) => {
            console.log(res);
            this.wishlistData = res.data
            this._WishlistService.wishlistWritableCount.set(res.count)
            
          }
        })
      }
    })
  }
  addProduct(p_id : string):void {
    this._CartService.addProductToCart(p_id).subscribe({
      next: (res) => {
        console.log(res.data);
        this._CartService.cartTotalNumber.next(res.numOfCartItems);
        this._ToastrService.success(res.message,'',{timeOut: 2000, positionClass: 'toast-bottom-right'})

      }
    })
  }
  goback() {
    this._location.back()
  }
}
