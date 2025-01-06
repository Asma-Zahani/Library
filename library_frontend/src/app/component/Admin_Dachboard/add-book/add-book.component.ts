import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, Category } from "../../../models/book.model";
import { BookService } from '../../../services/book.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, Select, ReactiveFormsModule, InputTextModule, FloatLabel, FormsModule, ButtonModule, TextareaModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  id: number = 0;
  newAuthor = { name: '', key: '' };
  authors: { name: string; key: string }[] = [];
  newCategory = { name: '' };
  categories: Category[] = [];
  status: any[] | undefined;
  selectedStatus: any | undefined;
  book: Book | undefined;
  isEditMode: boolean = false;
  bookForm: FormGroup;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      archiveId: ['', Validators.required],
      title: ['', Validators.required],
      authors: [],
      categories: [],
      firstPublishYear: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
      availabilityStatus: new FormControl<any | null>(null),
      price: ['', [Validators.required, Validators.min(0)]],
      availableQuantity: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.status = [
      { name: 'open' },
      { name: 'private' },
      { name: 'borrow_available' },
    ];

    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.isEditMode = true;
      this.bookService.getBookById(bookId).subscribe((book: Book) => {
        this.book = book;
        this.id = book.id || 0;
        this.fillForm(book);
      });
    }
  }

  addAuthor() {
    if (this.newAuthor.name && this.newAuthor.key) {
      this.authors.push({ ...this.newAuthor });
      this.newAuthor = { name: '', key: '' };
    } else {
      alert('Please fill in both the name and key of the author.');
    }
  }

  addCategory() {
    if (this.newCategory.name) {
      this.categories.push({ ...this.newCategory });
      this.newCategory = { name: '' };
    } else {
      alert('Please fill in the name of the category.');
    }
  }

  removeAuthor(index: number) {
    this.authors.splice(index, 1);
  }

  removeCategory(index: number) {
    this.categories.splice(index, 1);
  }

  fillForm(book: Book) {
    this.bookForm.patchValue({
      archiveId: book.archiveId,
      title: book.title,
      firstPublishYear: book.firstPublishYear,
      availabilityStatus: book.availabilityStatus,
      price: parseFloat(String(book.price)),
      availableQuantity: book.availableQuantity,
      description: book.description || '',
      imageUrl: book.imageUrl || '',
    });
    this.authors = book.authors;
    this.categories = book.categories;
    this.selectedStatus = book.availabilityStatus;
    this.bookForm.updateValueAndValidity();
  }

  onSubmit() {
    if (this.bookForm.invalid || this.authors.length === 0 || this.categories.length === 0) {
      this.bookForm.markAllAsTouched(); // Mark all form fields as touched

      // Custom validation for authors and categories
      if (this.authors.length === 0) {
        alert("Please add at least one author.");
      }
      if (this.categories.length === 0) {
        alert("Please add at least one category.");
      }

      return; // Prevent submission if form or custom fields are invalid
    }
    const formValues = this.bookForm.value;
    const bookData: Book = {
      archiveId: formValues.archiveId,
      categories: this.categories,
      coverId: '',
      firstPublishYear: formValues.firstPublishYear,
      authors: this.authors,
      coverEditionKey: '',
      title: formValues.title,
      availabilityStatus: formValues.availabilityStatus,
      price: parseFloat(formValues.price),
      availableQuantity: formValues.availableQuantity,
      user: this.isEditMode ? this.book?.user : undefined,
      description: formValues.description,
      imageUrl: formValues.imageUrl,
    };

    if (this.isEditMode) {
      this.bookService.updateBook(bookData, this.id).subscribe((updatedBook: any) => {
        this.router.navigate(['/dashboard/books']);  // Navigate to books list after adding category

        console.log('Book updated:', updatedBook);
      });
    } else { 
      this.bookService.addBook(bookData).subscribe((newBook: any) => {
        this.router.navigate(['/dashboard/books']);  // Navigate to books list after adding category
        console.log('Book added:', newBook);
      });
    }
  }
}
