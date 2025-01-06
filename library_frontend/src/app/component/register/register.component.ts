import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
  imports: [
    FormsModule,
    CommonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    ButtonModule,
    PanelModule,
    ToastModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  };
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  // Register method with email validation
  register(): void {
    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.showErrorToast(this.errorMessage);
      return;
    }

    if (!this.isValidEmail(this.user.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      this.showErrorToast(this.errorMessage);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.user).subscribe(
      (response) => {
        this.isLoading = false;
        this.successMessage = 'Registration successful! Redirecting to login.';
        this.showSuccessToast(this.successMessage);
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Registration failed. Please try again.';
        this.showErrorToast(this.errorMessage);
      }
    );
  }

  // Email validation method
  private isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  private showSuccessToast(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  private showErrorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
