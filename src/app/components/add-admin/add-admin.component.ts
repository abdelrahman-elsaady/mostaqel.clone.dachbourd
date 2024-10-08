

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
    const emailRegx =
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
    const passwordRegx =
      /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
    this.addAdminFormGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(emailRegx),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(passwordRegx),
      ]),
    });

    this.isLoadingSubscription = this.addAdminService.isLoading.subscribe(
      (loading) => (this.isLoading = loading)
    );
    this.loadAllData();
  }

  addAdminHandler() {
    if (!this.addAdminFormGroup.valid) {
      Swal.mixin({
        toast: true,
        title: 'invalid data',
        icon: 'error',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: 'top-right',
      }).fire();
      return;
    }

    this.addAdminService
      .addAdminToDB(
        this.addAdminFormGroup.value.email,
        this.addAdminFormGroup.value.password
      )
      .subscribe(
        (data) => {
          if (data.message) {
            Swal.mixin({
              toast: true,
              showConfirmButton: false,
              icon: 'success',
              title: data.message,
              timer: 2000,
              timerProgressBar: true,
              position: 'top-right',
            }).fire();
            this.loadAllData();
          }
        },
        (error) => {
          if (error.error.error.includes('duplicate key')) {
            Swal.mixin({
              toast: true,
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              text: 'Admin is Already Exsist',
              icon: 'error',
            }).fire();
          } else {
            Swal.mixin({
              toast: true,
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              text: error.error.error,
              icon: 'error',
            }).fire();
          }
        }
      );
    this.addAdminFormGroup.reset();
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
