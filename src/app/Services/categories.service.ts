import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<any[]>(`${environment.baseAPIURL}/category`);
  }
  getCategoriesStatistics(): Observable<any> {
    return this.http.get<any[]>(
      `${environment.baseAPIURL}/category/statistics`
    );
  }
  deleteCategory(id: any): Observable<any> {
    return this.http.delete<any[]>(`${environment.baseAPIURL}/category/${id}`);
  }
  updateCategory(newCategory: any): Observable<any> {
    return this.http.patch<any[]>(
      `${environment.baseAPIURL}/category/${newCategory._id}`,
      {
        title: newCategory.title,
        titleAr: newCategory.titleAr,
      }
    );
  }
  addNewCategory(newCategory: any): Observable<any> {
    return this.http.post<any[]>(
      `${environment.baseAPIURL}/category`,
      newCategory
    );
  }
}
