import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePicker } from 'primeng/datepicker';
import { TransactionService } from '../../services/transaction.service';
import { DatePipe } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputNumberModule, DatePicker, ConfirmDialogModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {

  purchaseDialogVisible: boolean = false;
  purchaseQuantity: number = 1; // Default quantity
  book: Book | null = null;
  user: User | null = null;
  date: Date | undefined;
  isBorrowed: Boolean = false;
  id: Number = 0;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private transactionService: TransactionService,
    private datePipe: DatePipe,
    private confirmationService:ConfirmationService
  ) { }

  ngOnInit(): void {
    const bookArchiveId = this.route.snapshot.paramMap.get('id');
    console.log(bookArchiveId)
    // Accessing query parameters
    this.route.queryParams.subscribe(params => {
      this.id = params['id']; // Get the 'id' query parameter
      console.log(this.id); // Check the 'id' value
    });
    if (bookArchiveId && this.id) {
      this.loadBookDetails(bookArchiveId);
       this.checkIfBookIsBorrowed();
      console.log(this.isBorrowed)
    }

  }
 
  confirmBuy(): void {
      this.confirmationService.confirm({
        message: 'Are you sure you want to Buy this book?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.onPurchase();
        },
      });
  }
 
  onReturn() {
    alert('Please return the book in our library');
  }
  
  checkIfBookIsBorrowed(): void {
    this.transactionService.isBookBorrowed(this.id as number).subscribe(
      (borrowed: boolean) => {
        this.isBorrowed = borrowed;
        console.log(borrowed)
      },
      (error) => {
        console.error('Error checking borrow status:', error);
        this.isBorrowed = false; 
      }
    );
  }

  get authorNames(): string {
    if (this.book?.authors && this.book.authors.length > 0) {
      return this.book.authors.map(author => author.name).join(', ');
    }
    return 'Unknown';
  }
  get categories(): string {
    if (this.book?.categories && this.book.categories.length > 0) {
      return this.book.categories.map(category => category.name).join(', ');
    }
    return 'Unknown';
  }

  loadBookDetails(archiveid: string) {

    this.bookService.getBookById(archiveid).subscribe((data) => {
      this.book = data; 
    });

  }

  onPurchase(): void {
    
    this.transactionService.purchaseBook(this.book?.id as number, this.book?.price as number, this.purchaseQuantity as number).subscribe(
      (response) => {
        console.log('Purchase successful', response);
      },
      (error) => {
        console.error('Purchase failed', error);
      }
    );

  }

  onBorrow() {
    if (!this.date) {
      alert('Please select a due date before borrowing the book.');
      return;
    }
    const formattedDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    console.log(formattedDate)
    this.transactionService.borrowBook(this.book?.id as number, formattedDate as String).subscribe({
      next: () => alert('Book borrowed successfully. You can recupered it whenever you want at our libraries!'),
      error: (err) => alert('Error during borrowing: ' + err.message)
    });
  }

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
}