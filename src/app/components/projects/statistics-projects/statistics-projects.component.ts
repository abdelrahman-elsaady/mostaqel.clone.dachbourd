import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectsService } from '../../../Services/projects.service';

@Component({
  selector: 'app-statistics-projects',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './statistics-projects.component.html',
  styleUrl: './statistics-projects.component.scss'
})
export class StatisticsProjectsComponent  implements OnInit {
  constructor(private proService: ProjectsService){}


  ngOnInit(){
    this.proService.getProjectsStats().subscribe(stats => {
      console.log(stats)
      this.stats = stats;

    })
  }

  stats: any = {};
}
