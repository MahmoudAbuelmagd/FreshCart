import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { map, takeUntil } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { ProductsService } from '../../core/services/products.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { unSub } from '../../shared/unSub.class';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, SearchPipe, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent extends unSub implements OnInit {
  products!: IProduct[];
  arrIds: string[] = [];
  searchValue: string = '';
  pageSize!: number;
  pageNum!: number;
  total!: number;
  constructor(
    private _ProductsService: ProductsService,
    private _ProductDetailsService: ProductDetailsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService,
  ) {
    super()
  }
  ngOnInit(): void {
    this._ProductsService.getProducts().pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        this.products = res.data;
        console.log(res.metadata);
        this.pageSize = res.metadata.limit;
        this.pageNum = res.metadata.currentPage;
        this.total = res.results;
      }
    })
    if (this._ProductDetailsService.productDetails) {
      this._ProductDetailsService.ngOnInit()
    }
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.arrIds = res.data.map((item: any) => item._id)
      }
    })
  }
  getDefaultProducts() {
    this._ProductsService.getProducts().pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        this.products = res.data
      }
    })
  }
  sortASC(): void {
    this._ProductsService.getProducts().pipe(
      map((products) => products.data.sort((a: any, b: any) => a.price - b.price)),// price ascending
      takeUntil(this.unSub$)
    )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.products = res;

        }
      })
  }
  sortDSC(): void {
    this._ProductsService.getProducts().pipe(
      map((products) => products.data.sort((a: any, b: any) => b.price - a.price)),
      takeUntil(this.unSub$)
    )// price Dscending
      .subscribe({
        next: (res) => {
          console.log(res);
          this.products = res;
        }
      })
  }
  bestSeller() {
    this._ProductsService.getProducts().pipe(
      map((products) => products.data.sort((a: any, b: any) => b.sold - a.sold)),
      takeUntil(this.unSub$)
    )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.products = res;
        }
      })
  }
  topRated() {
    this._ProductsService.getProducts().pipe(
      map((products) => products.data.sort((a: any, b: any) => b.ratingsQuantity - a.ratingsQuantity)),
      takeUntil(this.unSub$)
    )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.products = res;
        }
      })
  }
  // ngOnDestroy(): void {
  //   this.productsSub?.unsubscribe();
  //   this._ProductDetailsService.ngOnDestroy()
  // }
  addProduct(p_id: string): void {
    this._CartService.addProductToCart(p_id).pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, '', { timeOut: 2000, positionClass: 'toast-bottom-right' })
        this._CartService.cartTotalNumber.next(res.numOfCartItems)
      }
    })
  }
  addToWishlist(p_id: string): void {
    this._WishlistService.addProductToWishlist(p_id).pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, '', { timeOut: 2000, positionClass: 'toast-bottom-right' })
        this.arrIds = res.data
        this._WishlistService.wishlistWritableCount.set(res.data.length)

      }
    })
  }
  removeFromWishlist(p_id: string): void {
    this._WishlistService.removeProductfromWishlist(p_id).pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.warning(res.message, '', { timeOut: 2000, positionClass: 'toast-bottom-right' })
        this.arrIds = res.data
        this._WishlistService.wishlistWritableCount.set(res.data.length)
      }
    })
  }
  pageChanged(event: number) {
    console.log(event);
    scrollTo(0, 0);
    this._ProductsService.getProducts(event).pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data;
        this.pageSize = res.metadata.limit;
        this.pageNum = res.metadata.currentPage;
        this.total = res.results
      }
    })
  }
}
