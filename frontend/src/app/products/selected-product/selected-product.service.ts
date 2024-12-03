import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { ProductModel } from '../product.model';
import { NavigationEnd, Router } from '@angular/router';
import { saveStateToLocalStorage } from '../../shared/utils/localStorageUtils';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedProductService {
  public selectedProductSignal = signal<ProductModel>(new ProductModel);
  public appService = inject(AppService)
  private router = inject(Router)

  constructor() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  private appEffect = effect(() => {    
    let selectedProduct:ProductModel = this.appService.appSignal().neiman.selectedProduct;    

    untracked(() => { 
      this.selectedProductSignal.set({...selectedProduct})
      
    });
    
      //console.log('selectProductSignal', this.selectedProductSignal())

  });

  public setSelectedProduct = (product:ProductModel) => {
    console.log('product for selectedProductsignal', product)
    this.selectedProductSignal.set({...product})
    console.log('SelectedProductService.selectedProductsignal', this.selectedProductSignal())
    saveStateToLocalStorage({selectedProduct: this.selectedProductSignal()})
  }
}
