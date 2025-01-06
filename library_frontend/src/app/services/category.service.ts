import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 
  


  private apiUrl = 'http://localhost:8085/categories'; 

  constructor(private http: HttpClient) { }
  getCategories(): Observable<any[]> {
    const categories = this.http.get<any[]>(this.apiUrl, { responseType: 'json' });
    console.log(categories)
    return categories

  }
  deleteCategory(category: Category): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}/${category.id}`);
  }
  updateCategory(category: Category, id: number): Observable<Category> {
    console.log(category)
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
      }
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
    }
  
  getCategoryById(categoryId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${categoryId}`);
    }
}
