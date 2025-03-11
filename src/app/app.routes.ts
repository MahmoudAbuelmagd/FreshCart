import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainComponent } from './layouts/main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth/auth.component').then(c => c.AuthComponent),
    children: [
      { path: 'login', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent) },
      { path: 'register', loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent) },
      { path: 'forgot', loadComponent: () => import('./components/forgotpass/forgotpass.component').then(c => c.ForgotpassComponent) },
      { path: '**', loadComponent: () => import('./components/notfound/notfound.component').then(c => c.NotfoundComponent) }
    ]
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(c => c.CartComponent) },
      { path: 'home', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent) },
      { path: 'products', loadComponent: () => import('./components/products/products.component').then(c => c.ProductsComponent) },
      { path: 'brands', loadComponent: () => import('./components/brands/brands.component').then(c => c.BrandsComponent) },
      { path: 'categories', loadComponent: () => import('./components/categories/categories.component').then(c => c.CategoriesComponent) },
      { path: 'wishlist', loadComponent: () => import('./components/wishlist/wishlist.component').then(c => c.WishlistComponent) },
      { path: 'product/:p_id', loadComponent: () => import('./components/specific-product/specific-product.component').then(c => c.SpecificProductComponent) },
      { path: 'checkout/:cartId', loadComponent: () => import('./components/checkout/checkout.component').then(c => c.CheckoutComponent) },
      { path: 'allorders', loadComponent: () => import('./components/allorders/allorders.component').then(c => c.AllordersComponent) }
    ]
  },
  { path: 'cart', redirectTo: '/main/cart', pathMatch: 'full' },
  { path: 'allorders', redirectTo: '/main/allorders', pathMatch: 'full' },
  { path: '**', loadComponent: () => import('./components/notfound/notfound.component').then(c => c.NotfoundComponent) }
];
