import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

   constructor(private http: HttpClient) {}

  getSkills(): Observable<any> {
    return this.http.get<any[]>(`${environment.baseAPIURL}/skills`);
  }
  getSkillsStatistics(): Observable<any> {
    return this.http.get<any[]>(`${environment.baseAPIURL}/skills/statistics`);
  }
  getCategories(): Observable<any> {
    return this.http.get<any[]>(`${environment.baseAPIURL}/categories`);
  }
  deleteSkill(id: any): Observable<any> {
    return this.http.delete<any[]>(`${environment.baseAPIURL}/skills/${id}`);
  }
  updateSkill(newSkill: any): Observable<any> {
    return this.http.patch<any[]>(
      `${environment.baseAPIURL}/skills/${newSkill._id}`,
      {
        name: newSkill.name,
        // nameAr: newSkill.nameAr,
        category: newSkill.category._id,
      }
    );
  }
  addNewSkill(newSkill: any): Observable<any> {
    return this.http.post<any[]>(`${environment.baseAPIURL}/skills`, newSkill);
  }
  
}
