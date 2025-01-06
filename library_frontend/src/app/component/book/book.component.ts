import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { DropdownModule } from 'primeng/dropdown';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    CommonModule,
    TagModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  books: any[] = []; // To store fetched books
  filteredBooks: any[] = []; // To store filtered books
  searchQuery: string = ''; // Search query for book title or author
  selectedCategory: string = ''; // Selected category for filtering
  selectedAuthor: string = ''; // Selected author for filtering
  minPrice: number = 0; // Minimum price for filtering
  maxPrice: number = 1000; // Maximum price for filtering
  categories: string[] = []; // Dynamic categories

  constructor(private bookService: BookService, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories(); // Load categories and authors dynamically
  }

  // Method to transform long titles into shortened versions
  transform(value: string, limit: number): string {
    if (!value) return value;
    if (value.length <= limit) return value;
    return value.slice(0, limit) + '...';
  }

  // Method to determine the severity based on availability status
  getStatusSeverity(availabilityStatus: string): 'success' | 'info' | 'warn' | 'danger' {
    switch (availabilityStatus.toLowerCase()) {
      case 'open':
        return 'success';
      case 'private':
        return 'warn';
      case 'out of stock':
        return 'danger';
      case 'borrow_available':
        return 'info';
      default:
        return 'info';
    }
  }

  // Method for navigating to a book's detail page
  navigateToBook(bookId: string, id: string): void {
    console.log('Navigating to Book with ID:', bookId);
    this.router.navigate(['/book', bookId], {
      queryParams: { id: id }
    });
  }

  // Load books from the API
  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.filteredBooks = data; // Initially, display all books

        // Transform each book title after fetching the books
        this.books = this.books.map(book => ({
          ...book,
          title: this.transform(book.title, 20) // Limit the title to 20 characters
        }));

        this.applyFilters(); // Apply filters after loading books
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      }
    });
  }

  // Load categories and authors dynamically (replace with real API calls)
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        // Assuming response.categories is an array of categories, adjust as necessary
        this.categories = response.map((category: { name: string }) => category.name);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        // Optionally set a fallback list of categories
        this.categories = ['Fiction', 'Science', 'Biography', 'History', 'Fantasy'];
      }
    });
  }

  // Get book cover image based on availability
  getBookCoverImage(book: any): string {
    if (book.imageUrl != null){
      return book.imageUrl;
    }
    if (book.coverId != null && book.coverId !== 0 && book.coverId !== 'null') {
      return `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`;
    } else if (book.coverEditionKey != null && book.coverEditionKey !== 'null') {
      return `https://covers.openlibrary.org/b/olid/${book.coverEditionKey}-L.jpg`;
    }
    return 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg';
  }

  applyFilters(): void {
    this.filteredBooks = this.books.filter(book => {

      // Ensure book.title and book.author are defined before calling toLowerCase
      const matchesSearch =
        (book.title && book.title.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (book.author && book.author.toLowerCase().includes(this.searchQuery.toLowerCase()));
      const matchesCategory = this.selectedCategory
        ? book.categories.some((category: { name: string; }) => category.name.toLowerCase() === this.selectedCategory.toLowerCase())
        : true;
      const matchesPrice = book.price >= this.minPrice && book.price <= this.maxPrice;

      return matchesSearch && matchesCategory  && matchesPrice;
    });
  }

}
