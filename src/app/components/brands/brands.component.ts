import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { IBrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit,OnDestroy{
  brandsSub!: Subscription;
  brands!: IBrands[];
  private readonly _BrandsService = inject(BrandsService);
  ngOnInit(): void {
    this.brandsSub = this._BrandsService.getBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brands = res.data;
      },
      error:(err)=>{console.log(err);
      },
    })
  }
  ngOnDestroy(): void {
    this.brandsSub?.unsubscribe();
  }
}
