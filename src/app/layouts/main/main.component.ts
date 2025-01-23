import { Component } from '@angular/core';
import { NavMainComponent } from "../../components/nav-main/nav-main.component";
import { BrandsComponent } from "../../components/brands/brands.component";
import { CartComponent } from "../../components/cart/cart.component";
import { CategoriesComponent } from "../../components/categories/categories.component";
import { ProductsComponent } from "../../components/products/products.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavMainComponent, RouterOutlet, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
