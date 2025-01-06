import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  
  private apiUrl = 'http://localhost:8085/user'; // Replace with your backend endpoint

  constructor(private http: HttpClient) { }
 getUsers(): Observable<any[]> {
    const users = this.http.get<any[]>(this.apiUrl, { responseType: 'json' });
    console.log(users)
    return users

  }
  updateUser(user: User, id : number): Observable<User> {
    console.log(user)
      return this.http.put<User>(`${this.apiUrl}/${id}`, user);
    }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
deleteUser(user: User): Observable<User> {
  return this.http.delete<User>(`${this.apiUrl}/${user.id}`);
  }
  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
