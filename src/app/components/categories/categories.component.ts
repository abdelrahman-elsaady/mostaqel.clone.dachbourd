import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { CategoriesService } from '../../Services/categories.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  categories: any[] = [];
  p: number = 1;
  constructor(
    private categoryService: CategoriesService,
    public dialogModel: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  add() {
    const dialogWithForm = this.dialogModel.open(AddCategoryComponent, {
      restoreFocus: true,
      width: '600px',
    });
    dialogWithForm.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }
  edit(category: any) {
    const dialogWithForm = this.dialogModel.open(UpdateCategoryComponent, {
      restoreFocus: true,
      width: '600px',
      data: category,
    });
    dialogWithForm.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  remove(id: any) {
    Swal.fire({
      title: 'Are you sure to delete this category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe(() => {
          this.loadData();
        });
      }
    });
  }
  loadData(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data.categories;
      },
      (err) => console.log(err)
    );
  }
}
