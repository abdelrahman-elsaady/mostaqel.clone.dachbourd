import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../Services/users.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {
  clients: {
    _id: string;
    email: string;
    isVerified: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    isActive: string;
  }[] = [];

  filteredClients: {
    _id: string;
    email: string;
    isVerified: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    isActive: string;
  }[] = [];
  constructor(private serveiceUsers: UsersService) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.serveiceUsers.getAllClients().subscribe((data) => {
      this.filteredClients = data.clients;
      this.clients = data.clients;
      console.log(data)
    });
  }

  deactiveClient(id: string) {
    const data = {
      clientId: id,
    };

    this.serveiceUsers.deactivatedClient(data);
    setTimeout(() => {
      this.loadData();
    }, 100);
  }

  verifyClient(id: string) {
    const data = {
      clientId: id,
    };

    this.serveiceUsers.verifyClient(data);
    setTimeout(() => {
      this.loadData();
    }, 100);
  }

  filterClient(text: string) {
    if (text) {
      this.filteredClients = this.clients.filter((acc) =>
        acc.email.includes(text)
      );
    } else {
      this.filteredClients = this.clients;
    }
  }
}
