import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrdersService } from '../../core/services/orders.service';
import { unSub } from '../../shared/unSub.class';
import { ICart } from './../../core/interfaces/icart';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent extends unSub implements OnInit{
  allCartItems!: ICart | null;
  cart!: any;
  numOfCartItems: number = 0;
  private readonly _CartService = inject(CartService);
  private readonly _OrdersService = inject(OrdersService);
  ngOnInit(): void {
    this._CartService.getLoggedUserCart().pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        this.cart = res;
        this.allCartItems = res.data;
        this.numOfCartItems = res.numOfCartItems;
        console.log(res);
      }
    })
  }
  

  deleteProduct(p_id : string): void{
    this._CartService.removeProductfromCart(p_id).pipe(
      takeUntil(this.unSub$)
    ).subscribe({
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
    this._CartService.updateProductCount(p_id, count).pipe(
      takeUntil(this.unSub$)
    ).subscribe({
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
    this._CartService.clearAllCartItems().pipe(
      takeUntil(this.unSub$)
    ).subscribe({
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
