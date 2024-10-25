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
    return this.http.get<any[]>(`${environment.baseAPIURL}/categories`);
  }
  getCategoriesStatistics(): Observable<any> {
    return this.http.get<any[]>(
      `${environment.baseAPIURL}/category/statistics`
    );
  }
  deleteCategory(id: any): Observable<any> {
    return this.http.delete<any[]>(`${environment.baseAPIURL}/categories/${id}`);
  }
  updateCategory(newCategory: any): Observable<any> {
    return this.http.patch<any[]>(
      `${environment.baseAPIURL}/categories/${newCategory._id}`,
      {
        name: newCategory.name,
        // titleAr: newCategory.titleAr,
      }
    );
  }
  addNewCategory(newCategory: any): Observable<any> {
    return this.http.post<any[]>(
      `${environment.baseAPIURL}/categories`,
      newCategory
    );
  }
}
