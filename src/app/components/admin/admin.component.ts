import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  userLogin: FormGroup;
  schema: any;
  s: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.userLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.authService.userLoggedOut();
    this.s = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
  }

  ngOnInit(): void {
    this.schema = [
      {
        name: 'email',
        type: 'email',
      },
      {
        name: 'password',
        type: 'password',
      },
    ];
  }
  login() {
    const { email, password } = this.userLogin.value;
    this.authService.login(email, password).subscribe(
      (data) => {
        this.s.fire({
          title: 'Welcome',
          icon: 'success',
        });
        this.authService.setAuthenticated(data.token);
        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 1000);
      },

      (err) =>
        this.s.fire({
          title: 'Invalid Email or Password',
          icon: 'error',
        })
    );
  }
}
