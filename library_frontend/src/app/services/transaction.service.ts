import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
 

  private apiUrl = 'http://localhost:8085'; // Change to your purchase API endpoint
  
  constructor(private http: HttpClient, private datePipe: DatePipe) { }
  
    purchaseBook(bookId: number, price: number, quantity: number): Observable<any> {
      const token = localStorage.getItem('accessToken');
      console.log(token);
  
      if (!token) {
        throw new Error('No token found');
      }
  
      // Add both Authorization and Content-Type headers
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
  
      // Create the purchase object
      const purchase = {
        bookId,
        price,
        quantity,
      };
  
      // Send the POST request with the correct headers and body
      return this.http.post<any>(`${this.apiUrl}/purchases`, purchase, { headers });
    }
  borrowBook(bookId: number, dueDate: String) {
    console.log('Borrow date:', dueDate );
    console.log('Book details:', bookId);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    // Add both Authorization and Content-Type headers
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

    // Create the purchase object
    const borrow = {
      bookId,
      dueDate,
    };
    return this.http.post<any>(`${this.apiUrl}/borrows`, borrow, { headers });
  }
  // Method to check if the book is already borrowed
  isBookBorrowed(bookId: number): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`  // Assuming JWT is stored in localStorage
    });

    return this.http.get<boolean>(`${this.apiUrl}/borrows/${bookId}/is-borrowed`, { headers });
  }
  getMyPurchasedBooks(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`  // Assuming JWT is stored in localStorage
    });

    return this.http.get<any[]>(`${this.apiUrl}/purchases/users`, { headers });
  }
  getMyBorrowedBooks(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`  // Assuming JWT is stored in localStorage
    });

    return this.http.get<any[]>(`${this.apiUrl}/borrows/users`, { headers });
  }
  getPurchases(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/purchases`);
  }
  getBorrows(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/borrows`);
  }
  returnBook(borrowId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`  // Assuming JWT is stored in localStorage
    });
    return this.http.put<any>(`${this.apiUrl}/borrows/return/${borrowId}`, {}, { headers });
  }
}
