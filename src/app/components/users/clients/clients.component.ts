import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../Services/users.service';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  filteredClients: any[] = [];
  isLoading = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.usersService.getAllClients().pipe(
      switchMap(response => {
        const clients = response.clients;
        const projectRequests = clients.map(client => 
          this.usersService.getProjectsByClient(client._id).pipe(
            map(projectResponse => ({
              ...client,
              projectsNumber: projectResponse.length,
              proposalsNumber: client.proposals.length
            }))
          )
        );
        return forkJoin(projectRequests);
      })
    ).subscribe({
      next: (updatedClients) => {
        this.clients = updatedClients;
        this.filteredClients = updatedClients;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
        this.isLoading = false;
      }
    });
  }

  filterClient(text: string) {
    if (text) {
      this.filteredClients = this.clients.filter((client) =>
        client.email.toLowerCase().includes(text.toLowerCase()) ||
        client.firstName.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.filteredClients = this.clients;
    }
  }
}