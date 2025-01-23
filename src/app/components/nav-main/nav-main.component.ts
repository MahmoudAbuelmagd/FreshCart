import { Subscription } from 'rxjs';
import { Component, computed, OnDestroy, OnInit, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css'
})
export class NavMainComponent implements OnInit, OnDestroy {
  Subscription!: Subscription;
  userCart!: Subscription;
  wishlistCount: Signal<number> = computed(()=> this._WishlistService.wishlistWritableCount())
  constructor(private _Router: Router, private _CartService: CartService,private _WishlistService:WishlistService) { }
  logOutUser(): void{
    localStorage.removeItem('token')
    this._Router.navigate(['/auth/login'])
  }
  cartNumber: number = 0;
  ngOnInit(): void{

    this.Subscription =  this._CartService.cartTotalNumber.subscribe({
      next: (data) => {
        this.cartNumber = data;
        console.log(data);
        
      }
    })
    this.userCart =  this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartNumber = res.numOfCartItems;
      },
    })
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this._WishlistService.wishlistWritableCount.set(res.count)
      }
    })
  }
  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
    this.userCart.unsubscribe();
  }
}
