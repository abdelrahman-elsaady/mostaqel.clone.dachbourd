import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoriesComponent } from '../categories.component';
import { CategoriesService } from '../../../Services/categories.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [  CommonModule,

    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})


export class AddCategoryComponent implements OnInit {
  allCategories: any[] = [];
  newCategory: {
    name: string;
    // titleAr: string;
  } = { name: '' };
  constructor(
    public dialogRef: MatDialogRef<CategoriesComponent>,
    private categoryService: CategoriesService
  ) {}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      console.log(data);
      this.allCategories = data.categories;
    });
  }
  close(): void {
    this.dialogRef.close();
  }
  save() {
    this.categoryService.addNewCategory(this.newCategory).subscribe({
      next: (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Category added successfully!',
          timer: 1500
        });
        this.close();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add category. Please try again.'
        });
      }
    });
  }
}
