import { computed, Injectable, signal } from '@angular/core';
import { HomeData } from './home.data';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public homeSignal = signal<{homeData:HomeData}>({homeData: new HomeData()})

  public heroImg = computed(() => {
    return this.homeSignal().homeData.heroImg;
  });

  public galleryHeading = computed(() => {
    return this.homeSignal().homeData.galleryHeading;
  });


  public gallery = computed(() => {
    return this.homeSignal().homeData.gallery;
  });
}
