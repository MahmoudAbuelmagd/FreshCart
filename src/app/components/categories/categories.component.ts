import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categoriesSub!: Subscription;
  subCats!: Subscription;
  categories!: ICategory[];
  subCategories!: ICategory[];
  constructor(private _CategoriesService:CategoriesService){}
  ngOnInit(): void {
    this.categoriesSub = this._CategoriesService.getCats().subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res.data;
      },
      error: (err) => { console.log(err);
      }
    })
    this.subCats = this._CategoriesService.getSubCats().subscribe(
      {
        next: (res) => {
          console.log(res);
          this.subCategories = res.data.slice(0,20);
        },
        error: (err) => { console.log(err);
        }
      }
    )
  }
  ngOnDestroy(): void {
    this.categoriesSub.unsubscribe();
  }
}
