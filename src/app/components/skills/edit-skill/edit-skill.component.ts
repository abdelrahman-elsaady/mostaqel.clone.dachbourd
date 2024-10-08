import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SkillsComponent } from '../skills.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SkillsService } from '../../../Services/skills.service';

@Component({
  selector: 'app-edit-skill',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    NgxPaginationModule,],
  templateUrl: './edit-skill.component.html',
  styleUrl: './edit-skill.component.scss'
})
export class EditSkillComponent implements OnInit {
  allCategories: any[] = [];
  category: string = '';
  constructor(
    public dialogRef: MatDialogRef<SkillsComponent>,
    @Inject(MAT_DIALOG_DATA) public skill: any,
    private skillService: SkillsService
  ) {}
  ngOnInit(): void {
    this.skillService.getCategories().subscribe((data) => {

      console.log(this.skill);

      this.allCategories = data.categories;
      console.log(this.allCategories);
    });
  }
  close(): void {
    this.dialogRef.close();
    console.log(this.skill);
  }
  save() {
    console.log(this.skill);
    this.skillService.updateSkill(this.skill).subscribe((result) => {
      console.log(result);
    });
    this.close();
  }
}
