import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8085'; // Update with your backend auth endpoint
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    const userStorage = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<any>(userStorage ? JSON.parse(userStorage) : null);
    this.user = this.userSubject.asObservable();
    const token = localStorage.getItem('accessToken');
    this.loggedInSubject.next(!!token);
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  // Register method
  register(user: { username: string; password: string }): Observable<any> {
    console.log(user);
    return this.http.post(`${this.apiUrl}/user/register`, user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Save token to localStorage
  saveToken(token: string): void {
    localStorage.setItem('accessToken', token);
    this.loggedInSubject.next(true); // Set loggedInSubject only when the token is saved
  }

  // Save user data to localStorage
  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user); // Update the BehaviorSubject with new user data
  }

  // Get user data from localStorage
  getUser(): string | null {
    return localStorage.getItem('user');
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null;
  }

  // Example method to check if the user has an admin role
  isAdmin(): boolean {
    const user = this.userValue;
    return user?.roles === 'ADMIN' || false;
  }

  logout() {
    // Remove token and user from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    // Update the login status
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Login method
  login(credentials: { username: string; password: string }): Observable<any> {
    // Do not set loggedInSubject here, wait for the response
    return this.http.post(`${this.apiUrl}/user/login`, credentials).pipe(
      tap((response: any) => {
        // After successful login, save token and user
        this.saveToken(response.token); // Save the token
        this.saveUser(response.user);   // Save the user data
        this.loggedInSubject.next(true); // Update the login status
        if (response.user.roles === "ADMIN") {
          this.router.navigate(['/dashboard']); // Redirect to dashboard or appropriate page

        } else {
          this.router.navigate(['/books']); // Redirect to dashboard or appropriate page

        }
      })
    );
  }
}
