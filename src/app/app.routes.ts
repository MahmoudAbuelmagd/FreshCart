import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './layouts/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SpecificProductComponent } from './components/specific-product/specific-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth', component: AuthComponent, title: 'auth', children: [
      { path: 'login', component: LoginComponent, title: 'login' },
      { path: 'register', component: RegisterComponent, title: 'register' },
      { path: 'forgot', component: ForgotpassComponent },
      { path: "**", component: NotfoundComponent, title: 'Error 404' }
    ]
  },
  {
    path: 'main', component: MainComponent, canActivate: [authGuard], title: 'main', children: [
      { path: '', redirectTo:'home', pathMatch:'full'},
      { path: "cart", component: CartComponent, title: 'cart' },
      { path: "home", component: HomeComponent, title: 'Home' },
      { path: "products", component: ProductsComponent, title: 'products' },
      { path: "brands", component: BrandsComponent, title: 'brands' },
      { path: "categories", component: CategoriesComponent, title: 'categories' },
      { path: "wishlist", component: WishlistComponent, title: 'wishlist' },
      { path: "product/:p_id", component: SpecificProductComponent, title: 'product Details' },
      { path: "checkout/:cartId", component: CheckoutComponent},
      { path: 'allorders', component:AllordersComponent}
    ]
  },
  { path:'cart', redirectTo:"/main/cart", pathMatch:'full'},
  { path:'allorders', redirectTo:"/main/allorders", pathMatch:'full'},
  { path: "**", component: NotfoundComponent, title: 'Error 404' }
];
