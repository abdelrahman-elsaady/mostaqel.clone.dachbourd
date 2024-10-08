import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  UserAuthBehavior: BehaviorSubject<boolean>;
  constructor(private httpclient: HttpClient) {
    this.UserAuthBehavior = new BehaviorSubject<boolean>(this.isAuthenticated);
  }
  get isAuthenticated(): boolean {
    return sessionStorage.getItem('token') ? true : false;
  }

  login(email: string, password: string): Observable<any> {
    return this.httpclient.post<any>(
      `${environment.baseAPIURL}/admins/login`,
      {
        email,
        password,
      }
    );
  }
  setAuthenticated(toekn: string): void {
    sessionStorage.setItem('token', toekn);
    this.UserAuthBehavior.next(this.isAuthenticated);
  }
  userLoggedOut(): void {
    sessionStorage.removeItem('token');
    this.UserAuthBehavior.next(this.isAuthenticated);
  }

  getuserIsLoggedIn(): Observable<boolean> {

    // Here We Used Behaviour Subject as Observable that can be subscribed
    return this.UserAuthBehavior.asObservable();
  }
}
