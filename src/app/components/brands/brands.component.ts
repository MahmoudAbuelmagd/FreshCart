import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IBrands } from '../../core/interfaces/ibrands';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [ NgFor, NgIf, AsyncPipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  brands$: Observable<IBrands[]>;
  private readonly _BrandsService = inject(BrandsService);
  constructor() {
    this.brands$ = this._BrandsService.getBrands().pipe(
      map(res => res.data)
      )
    }
  
}
