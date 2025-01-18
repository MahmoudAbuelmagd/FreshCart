import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { Orders } from '../../core/interfaces/orders';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit{
  userOrders: Orders[] = [];
  decodedToken!:any
  constructor(private _OrdersService:OrdersService,private _AuthenticationService:AuthenticationService){}
  ngOnInit(): void {
    
    this.decodedToken = this._AuthenticationService.getDecodedToken()
    this._OrdersService.getAllOrders(this.decodedToken.id).subscribe({
      next: res => {
        this.userOrders = res;
        console.log(res); 
      }, error: err => {
        console.log(err);
      }
    })
    
  }
}
