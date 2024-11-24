import { Component, inject } from '@angular/core';
import { ProductSidebarService } from './product-sidebar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateRatingStarsDirective } from '../../shared/directives/create-rating-stars.directive';

@Component({
  selector: 'app-product-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreateRatingStarsDirective
  ],
  templateUrl: './product-sidebar.component.html',
  styleUrl: './product-sidebar.component.scss'
})
export class ProductSidebarComponent {
  private productSidebarService = inject(ProductSidebarService);
  public categoryName = 'All Men';

  public productSidebarData = this.productSidebarService.productSidebarSignal();


  public setCategory = (category:string) => {
    this.productSidebarData.categories.currentCategory = category;
    this.categoryName = category;
    console.dir('ProductSidebarComponent.productSidebarData', this.productSidebarData)
    this.updateSidebarData();
  }

  public updateSidebarData = () => {
    this.productSidebarService.updateSidebarData(this.productSidebarData);
  }

}
