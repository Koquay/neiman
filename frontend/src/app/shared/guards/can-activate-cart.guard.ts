import { effect, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { ToastrService } from 'ngx-toastr';

let numberOfCartItems = 0;

export const canActivateCartGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const toastr = inject(ToastrService);
  const cartEffect = effect(() => {
    numberOfCartItems = cartService.cartSignal().length;
  });

  if (numberOfCartItems) {
    return true;
  }
  toastr.error('Your cart is currently empty!', '');
  return false;
};
