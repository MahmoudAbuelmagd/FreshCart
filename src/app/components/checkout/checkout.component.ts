import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../core/services/orders.service';
import { ActivatedRoute} from '@angular/router';
import { unSub } from '../../shared/unSub.class';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent extends unSub{
  detailsValues!: any;
  cartId!: any;
  constructor(private _FormBuilder: FormBuilder,
    private _OrdersService: OrdersService,
    private _ActivatedRoute: ActivatedRoute) { 
      super()
    }
  checkoutForm: FormGroup = this._FormBuilder.group({
    shippingAddress:this._FormBuilder.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required,, Validators.pattern(/^01[0-9]{9}$/)]],
      city: [null, [Validators.required]]
    })
  })
  submitInfo(): void{
    this.detailsValues = this.checkoutForm.value;
    console.log(this.detailsValues);
    this._OrdersService.getCheckoutSession(this.detailsValues , this.cartId).pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.session.url);
        res.cancel_url = "http://localhost:4200/main/cart";
        if (res.session && res.session.url) {
          // window.location.href = res.session.url;
          window.open(res.session.url, '_self');
        }
      }
    })
  }
  ngOnInit(): void{
    this._ActivatedRoute.paramMap.subscribe({
      next: (pinfo) => {
        this.cartId = pinfo.get('cartId')
        console.log(this.cartId);
      }
    })
  }
}
