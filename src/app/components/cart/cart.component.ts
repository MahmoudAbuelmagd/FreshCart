import { ICart } from './../../core/interfaces/icart';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy{
  cartSub!: Subscription;
  allCartItems!: ICart | null;
  cart!: any;
  numOfCartItems: number = 0;
  private readonly _CartService = inject(CartService);
  private readonly _OrdersService = inject(OrdersService);
  ngOnInit(): void {
    this.cartSub = this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cart = res;
        this.allCartItems = res.data;
        this.numOfCartItems = res.numOfCartItems;
        console.log(res);
      }
    })
  }
  ngOnDestroy(): void {
    this.cartSub?.unsubscribe()
  }

  deleteProduct(p_id : string): void{
    this._CartService.removeProductfromCart(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this.cart = res;
        this.allCartItems = res.data;
        this.numOfCartItems = res.numOfCartItems;
        this._CartService.cartTotalNumber.next(res.numOfCartItems)
      }
    })
  }
  updateCount(p_id:string , count:number):void {
    this._CartService.updateProductCount(p_id, count).subscribe({
      next: (res) => {
        console.log(res)
        this.allCartItems = res.data;
        this.cart = res;
        this.numOfCartItems = res.numOfCartItems
        this._CartService.cartTotalNumber.next(res.numOfCartItems)
      }
    })
  }
  clearCart(): void{
    this._CartService.clearAllCartItems().subscribe({
      next: (res) => {
        console.log(res);
        this.allCartItems = null;
        // this.cart.numOfCartItems = 0
        this.numOfCartItems = res.numOfCartItems;
        this._CartService.cartTotalNumber.next(0)
      }
    })
  }
  
}
