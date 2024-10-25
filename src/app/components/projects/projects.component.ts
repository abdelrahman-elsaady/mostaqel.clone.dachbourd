import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../Services/projects.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

 stats: any = {
    allProjectsCount: 0,
    openProjectsCount: 0,
    closeProjectsCount: 0
  };

  constructor(private proService: ProjectsService) {}

  ngOnInit() {
    this.proService.getAllProjects().subscribe((projects: any) => {
      this.stats.allProjectsCount = projects.length;
      this.stats.openProjectsCount = projects.filter((p: any) => p.status === 'open').length;
      this.stats.closeProjectsCount = projects.filter((p: any) => p.status === 'close').length;
    });
  }

}
