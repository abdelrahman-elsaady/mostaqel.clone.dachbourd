import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  // private apiUrl = 'http://localhost:3000/api'; // adjust URL as needed

  constructor(private http: HttpClient) { }

  getPlatformEarnings(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/platformEarnings`);
  }

  initiatePaypalTransfer(amount: number): Observable<any> {
    return this.http.post(`${environment.baseAPIURL}/platformEarnings/transfer`, { amount });
  }
}
