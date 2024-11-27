import { Component, effect, inject } from '@angular/core';
import { SelectedProductService } from './selected-product.service';
import { ProductModel } from '../product.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-selected-product',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './selected-product.component.html',
  styleUrl: './selected-product.component.scss'
})
export class SelectedProductComponent {
  private selectedProductService = inject(SelectedProductService);
  private cartService = inject(CartService);
  public selectedProduct:ProductModel = new ProductModel();
  private toastr = inject(ToastrService)
  public sizes = ['SMALL', 'MEDIUM', 'LARGE', 'X-LARGE', 'XX-LARGE'];
  public size:string = '';
  public quantity?:number;
  
  public quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private selectedProductEffect = effect(() => {
    this.selectedProduct = this.selectedProductService.selectedProductSignal();
    console.log('SelectedProductComponent.selectedProduct', this.selectedProduct)
  })

  public setSize = (size:string) => {
    this.size = size;
  }

  public setQuantity = (quantity:number) => {
    this.quantity = quantity;
  }

  public addToCart = () => {
    if(!this.size) {
      this.toastr.warning('Please select a size to proceed.', '');
      return;
    }
    if(!this.quantity) {
      this.toastr.warning('Please select a quantity to proceed.', '');
      return;
    }
    this.selectedProduct.size = this.size
    this.selectedProduct.quantity = this.quantity

    this.cartService.addToCart(this.selectedProduct as ProductModel)
  }
  
}
