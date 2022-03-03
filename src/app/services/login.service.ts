import { LoginModel } from './../model/login.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators'
import { Router } from '@angular/router';

const LOGIN_KEY = 'login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginModelBehaviorSubject: BehaviorSubject<LoginModel | null>;
  public login: Observable<LoginModel | null>

  constructor(private http: HttpClient, private route: Router) { 
    this.loginModelBehaviorSubject = new BehaviorSubject<LoginModel | null>(JSON.parse(<string>localStorage?.getItem(LOGIN_KEY)));
    this.login = this.loginModelBehaviorSubject.asObservable();
  }

  performLogin(entrada: LoginModel): Observable<LoginModel>{
    console.log('performLogin(' + JSON.stringify(entrada) + ')');
    return this.http.post<LoginModel>(environment.login, entrada).pipe(map(retornoApi => {

      console.log('login OK: ' + JSON.stringify(retornoApi));
      this.loginModelBehaviorSubject.next(retornoApi);
      localStorage.setItem(LOGIN_KEY, JSON.stringify(retornoApi));
      return retornoApi;
    }));
  }

  performLogout(): void{
    
    localStorage.removeItem(LOGIN_KEY);
    this.loginModelBehaviorSubject.next(null);
    this.route.navigate(['/login']);
    
  }
}
