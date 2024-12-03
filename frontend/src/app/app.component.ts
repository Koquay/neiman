import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BreadcrumbsComponent } from './shared/components/breadcrumbs/breadcrumbs.component';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  private appService = inject(AppService);


  ngOnInit() {
    this.appService.restoreStateFromLocalStorage();  
  }
}
