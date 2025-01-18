import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

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
  constructor(private _Router: Router, private _CartService: CartService) { }
  logOutUser(): void{
    sessionStorage.removeItem('token')
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
  }
  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
    this.userCart.unsubscribe();
  }
}
