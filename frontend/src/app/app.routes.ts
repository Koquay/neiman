import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SelectedProductComponent } from './products/selected-product/selected-product.component';
import { CartComponent } from './cart/cart.component';
import { canActivateCartGuard } from './shared/guards/can-activate-cart.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'products', component: ProductsComponent},
    { path: 'selected-product', component: SelectedProductComponent }, 
    { path: 'cart', component: CartComponent, canActivate: [canActivateCartGuard] }, 

    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'home'
    },
];
