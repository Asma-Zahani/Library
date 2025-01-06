import { TransactionService } from './../../../services/transaction.service';
import { CategoryService } from './../../../services/category.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { Book, Category } from '../../../models/book.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';


@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [CommonModule, TableModule, ButtonModule, ConfirmDialogModule]
})
export class TableComponent implements OnInit {


  apiPath: string = '';
  books: Book[] =[];
  columns: string[] = []; // To hold the dynamic column names
  users: User[] = []
  categories: Category[] = [];
  purchases: any[] = [];
  borrows: any[] = [];
  isPurchasesOrBorrows: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private transactionService: TransactionService,
    private confirmationService: ConfirmationService,
    private userService: UserService,
  private categoryService:CategoryService) { }

  ngOnInit(): void {
    // Get the current path dynamically
    const currentPath = this.route.snapshot.url.join('/');  // Get the current URL path
    console.log(currentPath);
    this.apiPath = currentPath;
    this.fetchData();
    
  }

  fetchData(): void {
    if (this.apiPath === "books") {
      this.isPurchasesOrBorrows = false;
      this.bookService.getBooks().subscribe({
        next: (data) => {
          console.log('Books:', data);
          this.books = data;
          if (data.length > 0) {
            // Extract column names from the first book object
            this.columns = Object.keys(data[0]);
          }
        },
        error: (error) => {
          console.error('Error fetching books:', error);
        }
      });
    } else if (this.apiPath === "users") {
      this.isPurchasesOrBorrows = false;

      this.userService.getUsers().subscribe({
        next: (data) => {
          console.log('Users:', data);
          this.users = data;
          if (data.length > 0) {
            // Extract column names from the first book object
            this.columns = Object.keys(data[0]);
          }
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
    } else if (this.apiPath === "categories") {
      this.isPurchasesOrBorrows = false;

      this.categoryService.getCategories().subscribe({
        next: (data) => {
          console.log('Categories:', data);
          this.categories = data;
          if (data.length > 0) {
            // Extract column names from the first book object
            this.columns = Object.keys(data[0]);
          }
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
    } else if (this.apiPath === "purchases") {
      this.isPurchasesOrBorrows = true;

      console.log("this.purchases")
      this.transactionService.getPurchases().subscribe({
        next: (data) => {
          console.log('purchases:', data);
          this.purchases = data;
          if (data.length > 0) {
            // Extract column names from the first book object
            this.columns = Object.keys(data[0]);
          }
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
    } else if (this.apiPath === "borrows") {
      this.isPurchasesOrBorrows = true;

      console.log("this.purchases")
      this.transactionService.getBorrows().subscribe({
        next: (data) => {
          console.log('borrows:', data);
          this.borrows = data;
          if (data.length > 0) {
            // Extract column names from the first book object
            this.columns = Object.keys(data[0]);
          }
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
    }
  }
  getPropertyValue(key: string, book?: Book, user?: User): any {
    if (book) {
      return (book as any)[key] || 'N/A'; 

    } else if (user) {
      return (user as any)[key] || 'N/A'; 

    }
  }

 
  confirmDelete(item: Book | User | Category): void {
    if ('archiveId' in item) {  // Check if it's a Book (Book has 'archiveId' property)
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this book?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteRow(item as Book);
        },
      });
    } else if ('username' in item) {  // Check if it's a User (User has 'id' property)
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this user?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteRow(item as User);
        },
      });
    } else if ('name' in item) {  
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this category?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteRow(item as Category);
        },
      });
    }
  }

  deleteRow(item: Book | User | Category): void {
    if ('archiveId' in item) {  // Check if it's a Book
      this.bookService.deleteBook(item).subscribe(() => {
        console.log("book deleted");
        this.books = this.books.filter((book) => book !== item);

      }, (error) => {
        console.error('Error deleting book:', error);
      });
      console.log('Deleting row:', item);
    } else if ('username' in item) {  // Check if it's a User
      this.userService.deleteUser(item).subscribe(() => {
        console.log("user deleted");
        this.users = this.users.filter((user) => user !== item);

      }, (error) => {
        console.error('Error deleting user:', error);
      });
      console.log('Deleting row:', item);
    } else if ('name' in item) {  // Check if it's a User
      this.categoryService.deleteCategory(item).subscribe(() => {
        console.log("category deleted");
        this.categories = this.categories.filter((category) => category !== item);

      }, (error) => {
        console.error('Error deleting user:', error);
      });
      console.log('Deleting row:', item);
    }
  }

  
  editRow(item: Book | User | Category): void {
    if ('archiveId' in item) {
  console.log("book")
  this.router.navigate([`/dashboard/editBook`, item.archiveId]);

    } else if ('username' in item) {
  console.log("user")
  this.router.navigate([`/dashboard/editUser`, item.id]);
    } else if ('name' in item) {
      this.router.navigate([`/dashboard/editCategory`, item.id]);

}

  }
  getActiveList() {
    if (this.books && this.books.length > 0) {
      return this.books;
    } else if (this.users && this.users.length > 0) {
      return this.users;
    } else if (this.categories && this.categories.length > 0) {
      return this.categories;
    } else if (this.purchases && this.purchases.length > 0) {
      return this.purchases;
    } else if (this.borrows && this.borrows.length > 0) {
      return this.borrows;
    }
    return [];
  }
  returnBook(rowData: any) {
    this.transactionService.returnBook(rowData.id).subscribe(
      (response) => {
        console.log(response.message);  // Show success message
      },
      (error) => {
        console.error('Error:', error.error.message);  // Show error message
      }
    );
    console.log(rowData)
  }
  Add() {
    if (this.apiPath === 'books') {
      // Navigate to add book page
      this.router.navigate(['/dashboard/addBook']);
    } else if (this.apiPath === 'users') {
      // Navigate to add user page
      this.router.navigate(['/dashboard/addUser']);
    } else if (this.apiPath === 'categories') {
      // Navigate to add category page
      this.router.navigate(['/dashboard/addCategory']);
    } else if (this.apiPath === 'purchases') {
      // For purchases, navigate to the purchase page (if applicable)
      console.log('Add action for purchases is not applicable.');
    } else if (this.apiPath === 'borrows') {
      // For borrows, navigate to the borrow page (if applicable)
      console.log('Add action for borrows is not applicable.');
    } else {
      console.log('Unknown path for adding.');
    }
  }

  isObject(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  getObjectKeys(obj: object): string[] {
    return Object.keys(obj);
  }
}
