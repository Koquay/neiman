import { Component, inject } from '@angular/core';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductSidebarComponent } from './product-sidebar/product-sidebar.component';
import { ProductGalleryComponent } from "./product-gallery/product-gallery.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductCategoryComponent,
    ProductSidebarComponent,
    ProductGalleryComponent
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {


}
