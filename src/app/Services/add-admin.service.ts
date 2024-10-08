import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AddAdminService {


  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private http: HttpClient) {}

  addAdminToDB(email: string, password: string): Observable<any> {
    const adminData = {
      email,
      password,
    };

    return this.http.post<any>(
      `${environment.baseAPIURL}/admin/auth/register`,
      JSON.stringify(adminData),
      {
        headers: {
          'Content-Type': 'Application/json',
        },
      }
    );
  }
  getAllAdmins(): Observable<any> {
    return this.http.get<any[]>(`${environment.baseAPIURL}/admin/admins`);
  }
  deleteAdmin(adminId: any): Observable<any> {
    return this.http.delete<any[]>(
      `${environment.baseAPIURL}/admin/admins/${adminId}`
    );
  }




}
