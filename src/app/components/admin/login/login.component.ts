import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
      timer: 5000,
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
          title: "invalid email or password",
          icon: 'error',
        })
    );
  }
}
