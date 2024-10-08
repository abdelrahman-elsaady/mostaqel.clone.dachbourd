import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
  adminName!:string

  constructor(private route:Router){}
  routes: any[] = [
    {
      name: 'users',
      icon: 'fa-solid fa-users',
      // actions: ['freelancers', 'clients'],
    },
    {
      name: 'projects',
      icon: 'fas fa-edit',
      // actions: ['allprojects', 'Statistics'],
    },
    {
      name: 'categories',
      icon: 'fas fa-cogs',
      // actions: ['Get', 'Statistics'],
    },
    {
      name: 'skills',
      icon: 'fas fa-list-alt',
      // actions: ['Get', 'Statistics'],
    },
    {
      name: 'add-admin',
      icon: 'fa-solid fa-user-plus',
    },
  ];

  ngOnInit(): void {
    const token:string | null = sessionStorage.getItem('token')?.split('.')[1]!
    const unDecodedToken = JSON.parse(atob(token))

    this.adminName = unDecodedToken.adminRole
    console.log(unDecodedToken)
  }

  logoutHandler(){
    sessionStorage.removeItem('token')
    this.route.navigate(['/'])
  }
}
