import { Component, effect, inject } from '@angular/core';
import { ProductSidebarService } from '../product-sidebar/product-sidebar.service';
import { ProductGalleryService } from './product-gallery.service';
import { ProductModel } from '../product.model';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { Router, RouterModule } from '@angular/router';
import { SelectedProductService } from '../selected-product/selected-product.service';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PaginationComponent
  ],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss'
})
export class ProductGalleryComponent {
  private productSidebarService = inject(ProductSidebarService);
  private productGalleryService = inject(ProductGalleryService);
  private selectedProductService = inject(SelectedProductService);
  private router = inject(Router)
  public productSidebarData = this.productSidebarService.productSidebarSignal();
  public products:ProductModel[] = [];
  public productCount = 0;

 
  private productSidebarEffect = effect(() => {    
    this.productSidebarData = this.productSidebarService.productSidebarSignal();
    console.log('ProductGalleryComponent.productSidebarSignal', this.productSidebarData)

    this.getProducts();
  });

  public goToPage = (pageNo:number) => {
    //console.log('changePage event', pageNo)
    this.productSidebarData.pageNo = pageNo;
    this.getProducts();
  }

  private getProducts = () => {
    this.productGalleryService.getProducts(this.productSidebarData).subscribe(productData => {
      //console.log('productData', productData)
      this.products = productData.products;
      this.productCount = productData.productCount;
    })
  }

  public gotoSelectedProduct = async (product:ProductModel) => {
    console.log('ProductfGalery.product for selectedProductsignal', product)
    await this.selectedProductService.setSelectedProduct(product);
    this.router.navigateByUrl('/selected-product');
  }
}
