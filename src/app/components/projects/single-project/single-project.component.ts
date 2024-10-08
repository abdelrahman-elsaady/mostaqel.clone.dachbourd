import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectsService } from '../../../Services/projects.service';

@Component({
  selector: 'app-single-project',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './single-project.component.html',
  styleUrl: './single-project.component.scss'
})
export class SingleProjectComponent {

  constructor(private projectService: ProjectsService, private route: ActivatedRoute ){
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.projectService.getProjectById(id).subscribe((_project:any) => this.project = _project.project);
  }

  project: {
    _id?:any;
    title?: string;
    description?:string;
    amount?: number;
    numOffers?:number;
    duration?: number;
    clientId?: any;
    categoryId?: any;
    status?: any;
  } = {}

  Deactive(id: any){
    this.projectService.deactivateProject({id, status: 'close'}).subscribe((d:any) => {
      this.project.status = d.deactivatedProject.status
    })
  }

  active(id: any){
    this.projectService.deactivateProject({id, status: 'open'}).subscribe((d:any) => {
      this.project.status = d.deactivatedProject.status
    })

  }
}

