import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SelectedProductComponent } from './products/selected-product/selected-product.component';
import { CartComponent } from './cart/cart.component';
import { canActivateCartGuard } from './shared/guards/can-activate-cart.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthenticationComponent } from './authentication/authentication.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'products', component: ProductsComponent},
    { path: 'selected-product', component: SelectedProductComponent }, 
    { path: 'cart', component: CartComponent, }, 
    { path: 'checkout', component: CheckoutComponent, }, 
    { path: 'authentication/:action', component: AuthenticationComponent, }, 

    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'home'
    },
];
