import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { AuthenticationModel } from './authentication.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { saveStateToLocalStorage } from '../shared/utils/localStorageUtils';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authSignal = signal<AuthenticationModel>(new AuthenticationModel())
  private httpClient = inject(HttpClient);
  private appService = inject(AppService);
  private toastr = inject(ToastrService);
  private url = "/api/auth"

  private appEffect = effect(() => {    
    let user:AuthenticationModel = this.appService.appSignal().neiman.user;

    untracked(() => {
        this.authSignal.set(user)      
    });

  });

  signin = (authData:AuthenticationModel) => {
    //console.log('authDataService.authData.signin', authData)
    return this.httpClient.put<AuthenticationModel>(this.url, {authData}).pipe(
      tap(user => {
        //console.log('userService.user tap', user)
        this.authSignal.set({...user})
        saveStateToLocalStorage({user: this.authSignal()})
        //console.log('userService.authSignal', this.authSignal())
      }),
      catchError(error => {
        //console.log('error', error)
        this.toastr.error(error.message, '');
        throw error;
      })   
    )
  }

  signup = (authData:AuthenticationModel) => {
    //console.log('authDataService.authData', authData)

    return this.httpClient.post<AuthenticationModel>(this.url, {authData}).pipe(
      tap(user => {
        //console.log('userService.user tap', user)
        this.authSignal.set({...user})
        saveStateToLocalStorage({user: this.authSignal()})
        //console.log('userService.authSignal', this.authSignal())
      }),
      catchError(error => {
        //console.log('error', error)
        this.toastr.error(error.message, '');
        throw error;
      })   
    )
  }

  public signout = () => {
    this.authSignal.set(new AuthenticationModel())
    saveStateToLocalStorage({user: this.authSignal()})

  }
}
