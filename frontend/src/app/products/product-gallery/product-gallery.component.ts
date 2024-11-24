import { Component, effect, inject } from '@angular/core';
import { ProductSidebarService } from '../product-sidebar/product-sidebar.service';
import { ProductGalleryService } from './product-gallery.service';
import { ProductModel } from '../product.model';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent
  ],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss'
})
export class ProductGalleryComponent {
  private productSidebarService = inject(ProductSidebarService);
  private productGalleryService = inject(ProductGalleryService);
  public productSidebarData = this.productSidebarService.productSidebarSignal();
  public products:ProductModel[] = [];
  public productCount = 0;

 
  private productSidebarEffect = effect(() => {    
    this.productSidebarData = this.productSidebarService.productSidebarSignal();
    console.dir('ProductGalleryComponent.productSidebarSignal', this.productSidebarData)

    this.getProducts();
  });

  public goToPage = (pageNo:number) => {
    console.log('changePage event', pageNo)
    this.productSidebarData.pageNo = pageNo;
    this.getProducts();
  }

  private getProducts = () => {
    this.productGalleryService.getProducts(this.productSidebarData).subscribe(productData => {
      console.log('productData', productData)
      this.products = productData.products;
      this.productCount = productData.productCount;
    })
  }
}
