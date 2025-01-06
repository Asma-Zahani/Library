import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, Select, ReactiveFormsModule, InputTextModule, FloatLabel, ButtonModule, TextareaModule, PasswordModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  roles: any[] = [];
  selectedRole: any = null;
  userForm: FormGroup;
  isEditMode: boolean = false; // Flag to check if we are in edit mode or not
  user: User | undefined;
  id: number = 0;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],  // Required field
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], 
      role: ['', Validators.required]  // Required field
    });
}
  

  

 

  ngOnInit(): void {
    this.roles = [
      { name: 'USER', id: 1 },
      { name: 'ADMIN', id: 2 }
    ];
     const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode = true;
      this.userService.getUserById(userId).subscribe((user: User) => {
        this.user = user;
        this.id = user.id || 0
        console.log(user)
            this.fillForm(user); // Fill the form with book data for edit mode
          });
        }
       
  }
 fillForm(user: User) {
    // Patch values for form controls
   this.userForm.patchValue({
     username: user.username,  // Required field
     email: user.email,
     password:user.password,// Required and email format
     role: user.role  // Required field
      
    });
    
    this.userForm.updateValueAndValidity();
  }
  onSubmit() {
    // Check if the form is valid
    if (this.userForm.invalid) {
      console.log('Form is invalid');
      return;  // Exit if the form is invalid
    }

    // Set the role to the role name (for the backend)
    const roleName = this.selectedRole ? this.selectedRole.name : null;
    this.userForm.patchValue({ role: roleName });
    if (!this.isEditMode) {
      // Call the service to add the user
      this.userService.addUser(this.userForm.value).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.router.navigate(['/dashboard/users']);  // Navigate to users list after adding user
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    } else {
      this.userService.updateUser(this.userForm.value,this.id ).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.router.navigate(['/dashboard/users']);  // Navigate to users list after adding user
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    }
    
  }

  // Check for form control validity
  get username() {
    return this.userForm.get('username');
  }

  get email() {
    return this.userForm.get('email');
  }

  get role() {
    return this.userForm.get('role');
  }
  get password() {
    return this.userForm.get('password');
  }
}
