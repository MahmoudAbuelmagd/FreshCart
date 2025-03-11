import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories.service';
import { unSub } from './../../shared/unSub.class';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent extends unSub implements OnInit {
  // categories!: ICategory[];
  categories:WritableSignal<ICategory[]> = signal([])
  subCategories: WritableSignal<ICategory[]> = signal([]);  
  constructor(private _CategoriesService: CategoriesService) {
    super();
  }
  ngOnInit(): void {
    this._CategoriesService.getCats().pipe(
      takeUntil(this.unSub$)
    ).subscribe({
      next: (res) => {
        console.log(res);
        // this.categories = res.data;
        this.categories.set(res.data)
      }
    })
    this._CategoriesService.getSubCats().pipe(
      takeUntil(this.unSub$)
    ).subscribe({
        next: (res) => {
          console.log(res);
        this.subCategories.set(res.data.slice(0, 20)) ;
        
        }
      }
    )
  }
  
}
