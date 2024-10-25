

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AddAdminService } from '../../Services/add-admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.scss'
})
export class AddAdminComponent implements OnInit, OnDestroy {

  isLoading!: boolean;
  isLoadingSubscription!: Subscription;
  addAdminFormGroup!: FormGroup;
  allAdmins!: [any];


  constructor(private addAdminService: AddAdminService) {}

  ngOnInit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    this.addAdminFormGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(emailRegex),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.isLoadingSubscription = this.addAdminService.isLoading.subscribe(
      (loading) => (this.isLoading = loading)
    );
    this.loadAllData();
  }

  addAdminHandler() {
    if (!this.addAdminFormGroup.valid) {
      Swal.fire({
        toast: true,
        title: 'Invalid data',
        icon: 'error',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: 'top-right',
      });
      return;
    }
  
    this.addAdminService
      .addAdminToDB(
        this.addAdminFormGroup.value.email,
        this.addAdminFormGroup.value.password
      )
      .subscribe({
        next: (data) => {
          Swal.fire({
            title: 'Admin Added Successfully',
            icon: 'success',
          });
          this.addAdminFormGroup.reset();
          this.loadAllData(); // Refresh the admin list
        },
        error: (error) => {
          console.error('Error adding admin:', error);
          Swal.fire({
            title: 'Error Adding Admin',
            text: error.error?.error || 'An unexpected error occurred',
            icon: 'error',
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe();
  }
  loadAllData() {
    this.addAdminService.getAllAdmins().subscribe((data) => {
      this.allAdmins = data?.results;
    });
  }
  deleteAdmin(id: string) {
    Swal.fire({
      title: 'Are you sure to delete this Admin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.addAdminService.deleteAdmin(id).subscribe((data) => {
          this.loadAllData();
        });
      }
    });
  }











}
