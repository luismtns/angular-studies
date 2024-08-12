import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  registerFrom: FormGroup;
  tabIndex: number = 0;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loginForm = this.fb.group({
      EmailId: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.registerFrom = this.fb.group({
      firstName: ['Carlos', [Validators.required, Validators.minLength(2)]],
      middleName: ['Alberto', [Validators.required, Validators.minLength(2)]],
      lastName: ['de Nóbrega', [Validators.required, Validators.minLength(2)]],
      mobileNo: ['988775544', [Validators.required, Validators.pattern(/^(?:[2-8]|9[0-9])[0-9]{3}[0-9]{4}$/)]],
      emailId: ['email@test.com', [Validators.required, Validators.email]],
      password: ['1234567', [Validators.required, Validators.minLength(6)]],
    });
  }

  http = inject(HttpClient);
  router = inject(Router);

  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.userService.login(this.loginForm.value).subscribe((res: any) => {
        this.isLoading = false;
        if (res.result) {
          localStorage.setItem('user-token', res.data.token);
          this.router.navigateByUrl('dashboard');
        }
      });
    }
  }

  onRegister(): void {
    if (this.registerFrom.valid) {
      this.isLoading = true;
      this.userService.register(this.registerFrom.value).subscribe((res: any) => {
        this.isLoading = false;
        if (res.result) {
          this.tabIndex = 0;
        }
      });
    }
  }
}
