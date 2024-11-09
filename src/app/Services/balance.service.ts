import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private apiUrl = environment.baseAPIURL;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getPlatformEarnings(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/platformEarnings`);
  }

  initiatePaypalTransfer(amount: number): Observable<any> {
    const userId = this.authService.getCurrentUserId();
    const email = this.authService.getCurrentUserEmail();
    
    console.log('Initiating PayPal transfer:', { userId, amount, email });

    return this.http.post<any>(`${environment.baseAPIURL}/paypal/paypal-withdrawal`, {
      userId,
      amount,
      email
    });
  }
}
