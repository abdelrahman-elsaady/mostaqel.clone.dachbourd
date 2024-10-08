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
    return this.http.get(`${environment.baseAPIURL}/admin/projects`);
  }

  getProjectById(id: string) {
    return this.http.get(`${environment.baseAPIURL}/admin/projects/${id}`);
  }
  getProjectsStats() {
    return this.http.get(`${environment.baseAPIURL}/admin/projects-stats`);
  }
  deactivateProject(data: { id: string; status: string }) {
    return this.http.patch(
      `${environment.baseAPIURL}/admin/deactivate-project`,
      data
    );
  }
}


