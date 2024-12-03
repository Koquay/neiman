import { effect, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { ToastrService } from 'ngx-toastr';

export const canActivateCartGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const toastr = inject(ToastrService);

  if (cartService.cartSignal().length) {
    return true;
  }
  toastr.warning('Your cart is currently empty!', '');
  return false;
};
