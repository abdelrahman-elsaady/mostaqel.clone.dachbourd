import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { EditSkillComponent } from './edit-skill/edit-skill.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SkillsService } from '../../Services/skills.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    NgxPaginationModule,],
  templateUrl: './skills.component.html',
  // styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  skills: any[] = [];
  p: number = 1;
  constructor(
    private skillService: SkillsService,
    public dialogModel: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  add() {
    const dialogWithForm = this.dialogModel.open(AddSkillComponent, {
      restoreFocus: true,
      width: '900px',
    });
    dialogWithForm.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }
  edit(skill: any) {
    const dialogWithForm = this.dialogModel.open(EditSkillComponent, {
      restoreFocus: true,
      width: '900px',
      data: skill,
    });
    dialogWithForm.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  remove(id: any) {
    Swal.fire({
      title: 'Are you sure to delete this skill?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.skillService.deleteSkill(id).subscribe(() => {
          this.loadData();
        });
      }
    });
  }
  loadData(): void {
    this.skillService.getSkills().subscribe(
      (data) => {
        this.skills = data
        console.log(this.skills[0].category.name  );
        console.log(data);

      },
      (err) => console.log(err)
    );
  }
}
