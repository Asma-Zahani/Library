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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
  standalone: true,
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
export class LoginComponent {
  loginForm: FormGroup;
  credentials = { username: '', password: '' };
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.isLoading = true;
    this.messageService.clear(); // Clear previous messages

    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log(response)
        this.isLoading = false;
        this.authService.saveToken(response.token);
        this.authService.saveUser(response.user);
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: 'Welcome to the dashboard!',
        });
      },
      (error) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Invalid username or password.',
        });
      }
    );
  }

  get username() {
    return this.loginForm.get('username');
  }
}
