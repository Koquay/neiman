import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProductSidebarData } from '../product-sidebar/product-sidebar.service';
import { catchError, tap } from 'rxjs';
import { ProductModel } from '../product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductGalleryService {
  // public productSignal = signal<{ products:ProductModel[]; selectedProduct:ProductModel; productCount?:number }>({ products:[], selectedProduct: new ProductModel(), productCount: 0})
  public productSignal = signal<{
    products: ProductModel[];
    productCount?: number;
  }>({ products: [], productCount: 0 });

  // public productCount = this.productSignal().productCount;

  private httpClient = inject(HttpClient);
  private url = '/api/product';

  public getProducts = (productSidebarData: ProductSidebarData) => {
    const sidebarDataFilters = this.getSelectedFilters(productSidebarData);

    const params = new HttpParams({
      fromObject: { sidebarDataFilters },
    });

    return this.httpClient
      .get<{ products: ProductModel[]; productCount: number }>(this.url, {
        params,
      })
      .pipe(
        tap((productData) => {
          console.dir('productData', productData);
          this.productSignal.set({ ...productData})
          console.dir('ProductService.productSignal', this.productSignal())
          // this.productCount = this.productSignal().productCount;
        }),
        catchError((error) => {
          console.dir('error', error);
          // this.toastr.error('Problem getting products', 'Get Products')
          throw error;
        })
      );
  };

  private getSelectedFilters(productSidebarData: ProductSidebarData) {
    console.dir('ProductService.getSelectedFilters', productSidebarData);

    const category = productSidebarData.categories.currentCategory;

    const priceFilters = productSidebarData.priceFilter.priceRange.filter(
      (range) => range.checked
    );

    console.dir('ProductGalleryService.priceFilters', priceFilters);

    const priceRanges = [];
    for (let priceRange of priceFilters) {
      priceRanges.push(priceRange.range);
    }

    const ratingFilters = productSidebarData.ratings.ratings.filter(
      (filter:any) => filter.checked
    );
    console.dir('ProductService.ratingFilters', ratingFilters);

    const ratings:number[] = [];

    for (let rating of ratingFilters) {
      ratings.push(rating.rating);
    }

    const filters = {
      category,
      priceRanges,
      ratings,
      pageNo: productSidebarData.pageNo,
      pageSize: productSidebarData.pageSize,
    };

    console.dir('filters', filters);
    return JSON.stringify(filters);
  }
}