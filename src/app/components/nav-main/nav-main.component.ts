import { Subscription } from 'rxjs';
import { AfterViewInit, Component, computed, effect, ElementRef, OnDestroy, OnInit, Signal, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,TranslateModule],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css'
})
export class NavMainComponent implements OnInit, OnDestroy, AfterViewInit {
  Subscription!: Subscription;
  userCart!: Subscription;
  wishlistCount: Signal<number> = computed(() => this._WishlistService.wishlistWritableCount())
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  constructor(
    private _Router: Router,
    private _CartService: CartService,
    private _WishlistService: WishlistService,
    private _TranslationService:TranslationService) { 
    // effect(() => {
    //     console.log(this.wishlistCount());
    //   })
    }
  ngAfterViewInit(): void {
    console.log(this.navbarCollapse);
  }
  logOutUser(): void{
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token')
    }
    this._Router.navigate(['/auth/login'])
    this.closeNavCollapse()
  }
  cartNumber: number = 0;
  ngOnInit(): void{
    
    this.Subscription =  this._CartService.cartTotalNumber.subscribe({
      next: (data) => {
        this.cartNumber = data;
        console.log(data);
        
      }
    })
    this.userCart = this._CartService.getLoggedUserCart().subscribe({
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
  
  changeLang(lang : string):void {
    this._TranslationService.changeLang(lang)
  }

  
  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
    this.userCart.unsubscribe();
  }
  closeNavCollapse() {
    const NavHide = this.navbarCollapse.nativeElement
    if (NavHide.classList.contains('show')) {
      NavHide.classList.remove('show')
    }
  }
}
