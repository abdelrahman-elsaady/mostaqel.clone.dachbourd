import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoriesComponent } from '../categories.component';
import { CategoriesService } from '../../../Services/categories.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule,

    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent implements OnInit {
  categoryId: string = '';
  constructor(
    public dialogRef: MatDialogRef<CategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public category: any,
    private categoryService: CategoriesService
  ) {}
  ngOnInit(): void {
    console.log(this.category);
  }
  close(): void {
    this.dialogRef.close();
  }
  save() {
    this.categoryService.updateCategory(this.category).subscribe({
      next: (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Category updated successfully!',
          timer: 1500
        });
        this.close();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update category. Please try again.'
        });
      }
    });
  }
}
