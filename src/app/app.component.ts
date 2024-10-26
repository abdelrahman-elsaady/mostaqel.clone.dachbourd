import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent,NgxSpinnerModule,FormsModule,CommonModule,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  showDash = true; // or however you determine this
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  title = 'admin';
  // showDash: boolean = false;
  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private authService: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Hi Firsrt');

        this.showDash = this.authService.isAuthenticated && !event.url.includes('/admin');
      }
      //   this.spinnerService.show();
      // } else if (event instanceof NavigationEnd) {
      //   setTimeout(() => this.spinnerService.hide(), 1000);
      // }
    });
  }
}
