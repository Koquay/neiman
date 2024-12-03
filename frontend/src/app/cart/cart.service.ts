import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { ProductModel } from '../products/product.model';
import { ToastrService } from 'ngx-toastr';
import { saveStateToLocalStorage } from '../shared/utils/localStorageUtils';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartSignal = signal<ProductModel[]>([]);
  private toastr = inject(ToastrService)
  public appService = inject(AppService)

  private appEffect = effect(() => {    
    let cart:ProductModel[] = this.appService.appSignal().neiman.cart;

    untracked(() => {
        this.cartSignal.set([...cart])      
    });

  });

  public addToCart = (product:ProductModel) => {
    let cartProducts = this.cartSignal().filter(prod => prod._id !== product._id);
    cartProducts = [...cartProducts, product]
   
    this.cartSignal.set([...cartProducts])
    saveStateToLocalStorage({cart: this.cartSignal()})

    //console.log('CartService.cartSignal', this.cartSignal())
    this.toastr.success(product.name + ' added to cart', '')
  }

  public adjustQuantity = (productId:string, quantity:number) => {
    let product = this.cartSignal().find(product => product._id === productId);
    
    if(product) {
      product.quantity = quantity;
      saveStateToLocalStorage({cart: this.cartSignal()})      
    }
  }

  public removeProduct = (productId:string) => {
    let cartProducts = this.cartSignal().filter(prod => prod._id !== productId);
    this.cartSignal.set([...cartProducts])
    saveStateToLocalStorage({cart: this.cartSignal()})
  }
}
