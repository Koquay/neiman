import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationModel } from './authentication.model';
import { AuthenticationService } from './authentication.service';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
  authData = new AuthenticationModel(); 
  public authenticationSignal = signal<AuthenticationModel>(this.authData)
  private authenticationService = inject(AuthenticationService)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private toastr = inject(ToastrService);
  public action = '';

  constructor() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.action = this.activatedRoute.snapshot.paramMap.get('action') as string;
    //console.log('action', this.action);
  }

  public signup = () => {
    //console.log('authData', this.authData)
    this.authenticationService.signup(this.authData).subscribe(user => {
      this.authenticationSignal.set({...this.authData, ...user})
      //console.log('authenticationSignal', this.authenticationSignal())
      this.toastr.info("Welcome " + user.firstName, "")
      this.goBackToCallingPage()
    })
  }

  public signin = () => {
    //console.log('signin.authData', this.authData)
    this.authenticationService.signin(this.authData).subscribe(user => {
      this.authenticationSignal.set({...this.authData, ...user})
      //console.log('authenticationSignal', this.authenticationSignal())
      this.toastr.info("Welcome " + user.firstName, "")
      this.goBackToCallingPage()
    })
  }

  private goBackToCallingPage = () => {
    const breadcrumbs = JSON.parse(localStorage.getItem('neiman') as string).breadcrumbs;
    let previousUrl = '';

    //console.log('AuthenticationComponent.breadcrumbs', breadcrumbs)
    if(breadcrumbs.length > 2) {
      previousUrl = breadcrumbs[breadcrumbs.length-2].url;

      if(breadcrumbs[breadcrumbs.length-2].label === 'authentication') {
        previousUrl = breadcrumbs[breadcrumbs.length-3].url;
      }
    } else {
      previousUrl = breadcrumbs[0].url
    }

    this.router.navigateByUrl(previousUrl);
  }

}
