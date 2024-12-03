import { Injectable, signal } from '@angular/core';
import { ProductModel } from './products/product.model';
import { CheckoutModel } from './checkout/checkout.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public appSignal = signal<{ 
    neiman:{selectedProduct:ProductModel, cart:ProductModel[], checkoutData:CheckoutModel}
  }>({neiman:{selectedProduct: new ProductModel(), cart: [], checkoutData: new CheckoutModel()}})

  public restoreStateFromLocalStorage = () => {
    const neiman = JSON.parse(localStorage.getItem("neiman") as string);  
    this.appSignal.set({ neiman: {...neiman}}) 
    //console.log('appSignal', this.appSignal())
  }
}
