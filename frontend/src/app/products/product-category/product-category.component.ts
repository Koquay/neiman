import { Component, inject } from '@angular/core';
import { ProductCategoryService } from './product-category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.scss',
})
export class ProductCategoryComponent {
  private productCategoryService = inject(ProductCategoryService);
  public categoryData =
    this.productCategoryService.productCategorySignal().productCategoryData
      .categoryData;
}
