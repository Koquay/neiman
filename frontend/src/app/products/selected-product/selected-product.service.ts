import { Injectable, signal } from '@angular/core';
import { ProductModel } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class SelectedProductService {
  public selectedProductSignal = signal<ProductModel>(new ProductModel)

  public setSelectedProduct = (product:ProductModel) => {
    this.selectedProductSignal.set({...product})
    console.log('SelectedProductService.selectedProductsignal', this.selectedProductSignal())
  }
}
