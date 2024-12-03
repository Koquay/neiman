import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { AuthenticationModel } from '../../../authentication/authentication.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../cart/cart.service';
import { ProductSearchComponent } from "../../../product/product-search/product-search.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ProductSearchComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public authenticationService = inject(AuthenticationService);
  public cartService = inject(CartService);
  public user?:AuthenticationModel;
  public numberOfItems = 0;

  private authenticationEffect = effect(() => {
    this.user = this.authenticationService.authSignal();
  })

  private cartEffect = effect(() => {
    this.numberOfItems = this.cartService.cartSignal().length;
  })

  public signout = () => {
    this.authenticationService.signout();
  }
}
