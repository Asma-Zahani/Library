import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-borrows',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule,],
  templateUrl: './my-borrows.component.html',
  styleUrl: './my-borrows.component.css'
})
export class MyBorrowsComponent implements OnInit {
  borrows: any[] = []; // Replace 'any' with your actual Purchase model
  constructor(private borrowsService: TransactionService, private router: Router) { }
  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases(): void {
    this.borrowsService.getMyBorrowedBooks().subscribe({
      next: (response: any[]) => {
        console.log(response)
        this.borrows = response;  // Assign the response to the purchases array
        console.log('borrows fetched successfully:', this.borrows);
      },
      error: (err) => {
        console.error('Error fetching purchases:', err);
      }
    });

  }
  viewBookDetails(bookId: string, id: number) {
    this.router.navigate(['/book', bookId], {
      queryParams: { id: id }
    });
  }
}
