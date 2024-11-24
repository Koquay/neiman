import { Component, inject } from '@angular/core';
import { HomeService } from './home.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private homeService = inject(HomeService);
  public heroImg = this.homeService.heroImg();
  public galleryHeading = this.homeService.galleryHeading();
  public gallery = this.homeService.gallery();
  
  
}
