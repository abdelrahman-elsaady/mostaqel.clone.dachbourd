import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectsService } from '../../../Services/projects.service';

@Component({
  selector: 'app-get-projects',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule,RouterLink],
  templateUrl: './get-projects.component.html',
  styleUrl: './get-projects.component.scss'
})
export class GetProjectsComponent  implements  OnInit {
  constructor(private ProService: ProjectsService, private router: Router){
  }

  ngOnInit() {

    this.ProService.getAllProjects().subscribe(data  =>  { this.data = data});

  }



  data: any = {} ;

  filterProjects(value:any){
    if(value){
      this.data.projects = this.data.projects.filter( (p : any ) => p.title.toLowerCase().includes(value))

    }else{

      this.ProService.getAllProjects().subscribe(data  =>  this.data = data);
    }
  }

  deactiveProject( id:string, status: string){
    this.ProService.deactivateProject({id, status}).subscribe((d: any) => {
      d.deactivatedProject.status = (this.data.projects.find((pr:any) => pr._id == d.deactivatedProject._id)).status
      console.log((this.data.projects.find((pr:any) => pr._id == d.deactivatedProject._id)).status)
    });


    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/projects/Get'])
    })

  }

  p:number = 1;
}
