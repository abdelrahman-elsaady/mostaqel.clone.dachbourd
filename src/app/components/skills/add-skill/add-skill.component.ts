import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SkillsComponent } from '../skills.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SkillsService } from '../../../Services/skills.service';

@Component({
  selector: 'app-add-skill',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    NgxPaginationModule,],
  templateUrl: './add-skill.component.html',
  styleUrl: './add-skill.component.scss'
})
export class AddSkillComponent implements OnInit {
  allCategories: any[] = [];
  newSkill: {
    name: string;
    // nameAr: string;
    category: string;
  } = { name: '', category: '' };
  constructor(
    public dialogRef: MatDialogRef<SkillsComponent>,
    private skillService: SkillsService
  ) {}
  ngOnInit(): void {

    this.skillService.getCategories().subscribe((data) => {

      this.allCategories = data.categories;
    });

  }
  close(): void {
    this.dialogRef.close();
  }
  save() {
    this.skillService.addNewSkill(this.newSkill).subscribe((data) => {
      this.dialogRef.close();
    });
  }
}
