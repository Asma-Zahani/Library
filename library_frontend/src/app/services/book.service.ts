import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  

  private apiUrl = 'http://localhost:8085/books'; // Replace with your backend endpoint

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any[]> {
    const books = this.http.get<any[]>(this.apiUrl, { responseType: 'json' });
    console.log(books)
    return books

  }

  getBookById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/byArchiveId?archiveId=${encodeURIComponent(id)}`);
  }
  // Add a new book
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/add`, book);
  }

  // Update an existing book
  updateBook(book: Book, id: number): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/update/${id}`, book);
  }
  // Delete an existing book
  deleteBook(book: Book): Observable<Book> {
    return this.http.delete<Book>(`${this.apiUrl}/delete/${book.id}`);
  }
  fetchBooksByCategory(category: string): Observable<any> {
    const url = `${this.apiUrl}/saveByCategory?category=${category}`;
    return this.http.post<any>(url, {}); 
  }
}
