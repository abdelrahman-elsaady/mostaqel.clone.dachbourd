import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../Services/users.service';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-freelancers',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './freelancers.component.html',
  styleUrl: './freelancers.component.scss'
})
export class FreelancersComponent implements OnInit {
  freelancers: any[] = [];
  filteredFreelancers: any[] = [];
  isLoading = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.usersService.getAllFreelancers().pipe(
      switchMap(response => {
        const freelancers = response.freelancers;
        console.log(freelancers);
        const projectRequests = freelancers.map(freelancer => 
          this.usersService.getProjectsByClient(freelancer._id).pipe(
            map(projects => ({
              ...freelancer,
              projectsNumber: projects.length,
              proposalsNumber: freelancer.proposals.length
            }))
          )
        );
        return forkJoin(projectRequests);
      })
    ).subscribe({
      next: (updatedFreelancers) => {
        this.freelancers = updatedFreelancers;
        this.filteredFreelancers = updatedFreelancers;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching freelancers:', error);
        this.isLoading = false;
      }
    });
  }

  filterFreelancer(text: string) {
    if (text) {
      this.filteredFreelancers = this.freelancers.filter((freelancer) =>
        freelancer.email.toLowerCase().includes(text.toLowerCase()) ||
        freelancer.firstName.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.filteredFreelancers = this.freelancers;
    }
  }
}
