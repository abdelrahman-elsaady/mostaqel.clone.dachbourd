import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectsService } from '../../../Services/projects.service';
import Swal from 'sweetalert2';

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

    this.ProService.getAllProjects().subscribe(data  =>  {
       this.data = data; 
       console.log(data)
       console.log(this.data)
      });

// console.log(this.data);

  }



  data: any = {} ;

  filterProjects(value:any){
    if(value){
      this.data = this.data.filter( (p : any ) => p.title.toLowerCase().includes(value))

    }else{

      this.ProService.getAllProjects().subscribe(data  =>  this.data = data);
    }
  }

  deactiveProject(id: string, currentStatus: string) {
    // Show confirmation dialog first
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to change the project status to ${currentStatus === 'open' ? 'closed' : 'open'}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = currentStatus === 'open' ? 'closed' : 'open';
        this.ProService.deactivateProject(id, newStatus).subscribe({
          next: (updatedProject: any) => {
            const projectIndex = this.data.findIndex((pr: any) => pr._id === updatedProject._id);
            if (projectIndex !== -1) {
              this.data[projectIndex].status = updatedProject.status;
              Swal.fire({
                icon: 'success',
                title: 'Status Updated!',
                text: `Project status has been changed to ${newStatus}`,
                timer: 2000,
                showConfirmButton: false
              });
            }
          },
          error: (error) => {
            console.error('API error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            });
          }
        });
      }
    });
  }

  p:number = 1;
}
