import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) {}

  projects: {} = {};
  getAllProjects() {
    return this.http.get(`${environment.baseAPIURL}/projects`);
  }

  getProjectById(id: string) {
    return this.http.get(`${environment.baseAPIURL}/projects/${id}`);
  }
  getProjectsStats() {
    return this.http.get(`${environment.baseAPIURL}/projects-stats`);
  }


  
  deactivateProject(id: string, status: string) {
    return this.http.patch(
      `${environment.baseAPIURL}/projects/${id}`,
      { status }
    );
  }
}


