import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _http = inject(HttpClient)
  _router = inject(Router)

  private JWT_TOKEN: string = 'JWT_TOKEN';
  private OPTIONS = environment.RapidAPIConfig.OPTIONS;
  private userAuthenticated = new BehaviorSubject<boolean>(false)
  private currentLoginUser = new BehaviorSubject<string | null>(null);


  //Authentication using RapidAPI:

  //redentials
  //  yassin520@gdomain.com
  //  Ya123456@

  login(data: { email: string, password: string }) {
    this._http.post(`${environment.RapidAPIConfig.BASE_API}${'/login'}`, data, this.OPTIONS).pipe(
      tap((res: any) => {
        this.storeToken(res)
        this.userAuthenticated.next(true)
        this.currentLoginUser.next(data.email)
        this.redirectUser()
      }),
      catchError(err => throwError(err.message))
    ).subscribe()
  }

  private redirectUser() {
    this._router.navigate(['home'])
  }

  private storeToken(jwt: any) {
    localStorage.setItem('token', jwt.token);
  }

  logOut() {
    localStorage.removeItem(this.JWT_TOKEN)
    this.userAuthenticated.next(false)
    this.currentLoginUser.next(null)
    this._router.navigate(['login'])
  }
}
