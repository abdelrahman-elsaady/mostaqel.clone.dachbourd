import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  userStatistics = {
    totalUsers: 0,
    freelancerCount: 0,
    clientCount: 0,
    projectsCount: 0,
    offersCount: 0
  };

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.fetchUserStatistics();
  }

  fetchUserStatistics() {
    this.usersService.getAllUsers().subscribe(
      (response) => {
        this.userStatistics.totalUsers = response.users.length;
        this.fetchFreelancersCount();
        this.fetchClientsCount();
        this.fetchOffersCount(); 

      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchFreelancersCount() {
    this.usersService.getAllFreelancers().subscribe(
      (response) => {
        console.log(response);
        this.userStatistics.freelancerCount = response.freelancers.length;
      },
      (error) => {
        console.error('Error fetching freelancers:', error);
      }
    );
  }

  fetchClientsCount() {
    this.usersService.getAllClients().subscribe(
      (response) => {
        console.log(response);
        this.userStatistics.clientCount = response.clients.length;
        console.log(this.userStatistics.clientCount);
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  fetchOffersCount() {
    this.usersService.getAllProposals().subscribe(
      (response) => {
        this.userStatistics.offersCount = response.users.length;
      },
      (error) => {
        console.error('Error fetching offers:', error);
      }
    );
  }
}