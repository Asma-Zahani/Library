import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { PasswordModule } from 'primeng/password';
import { Category } from '../../../models/book.model';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, FloatLabel, ButtonModule, TextareaModule, PasswordModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode: boolean = false; // Flag to check if we are in edit mode or not
  category: Category | undefined;

  id: number = 0;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService 


  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],  // Required field
    });
  }
  ngOnInit(): void {
    
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.isEditMode = true;
      this.categoryService.getCategoryById(categoryId).subscribe((category: Category) => {
        this.category = category;
        this.id = category.id || 0
        console.log(category)
        this.fillForm(category); // Fill the form with book data for edit mode
      });
    }

  }
  fillForm(category: Category) {
      // Patch values for form controls
    this.categoryForm.patchValue({
      name: category.name,  // Required field
     
        
      });
      
    this.categoryForm.updateValueAndValidity();
  }
  // Function to fetch books from the API
  fetchDataFromApi() {
    const category = this.categoryForm.get('name')?.value; // Get category name from form control

    if (category) {
      console.log("Data is being fetched")
      this.bookService.fetchBooksByCategory(category).subscribe(
        response => {
          console.log('Books fetched:', response);  // Handle response
          this.router.navigate(['/dashboard/categories']);  // Navigate to categories list after adding category

        },
        error => {
          console.error('Error fetching books:', error);  // Handle error
        }
      );
    } else {
      console.log('Category name is required.');
    }
  
}
  get name() {
    return this.categoryForm.get('name');
  }
  onSubmit() {
    // Check if the form is valid
    if (this.categoryForm.invalid) {
      console.log('Form is invalid');
      return;  // Exit if the form is invalid
    }

    if (!this.isEditMode) {
      // Call the service to add the user
      this.categoryService.addCategory(this.categoryForm.value).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.router.navigate(['/dashboard/categories']);  // Navigate to users list after adding user
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    } else {
      this.categoryService.updateCategory(this.categoryForm.value, this.id).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.router.navigate(['/dashboard/categories']);  // Navigate to categories list after adding category
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    }

  }
}
