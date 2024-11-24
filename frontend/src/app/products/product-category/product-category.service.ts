import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  public productCategorySignal = signal<{
    productCategoryData: ProductCategoryData;
  }>({ productCategoryData: new ProductCategoryData() });

  public categoryData = computed(() => {
    return this.productCategorySignal().productCategoryData.categoryData;
  });

  constructor() {
    console.dir('productCategorySignal', this.productCategorySignal())
  }
}

export interface ProductCategoryModel {
  img: string;
  category: string;
}

export class ProductCategoryData {
  categoryData: ProductCategoryModel[] = [
    {
      img: 'nm_4835516_100244_m.webp',
      category: 'COATS & JACKET',
    },
    {
      img: 'nm_4706663_100106_a.webp',
      category: 'SNEAKERS',
    },
    {
      img: 'nm_4733302_100189_a.webp',
      category: 'T-SHIRTS',
    },
    {
      img: 'nm_4866012_100263_m.webp',
      category: 'LOAFERS & SIIP-ONS ',
    },
    {
      img: 'nm_4813037_100393_c.webp',
      category: 'JEANS',
    },
    {
      img: 'nm_4803302_100134_c.webp',
      category: 'BLAZERS & SPORT COATS ',
    },
  ];
}
