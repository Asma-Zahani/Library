import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { Menubar } from 'primeng/menubar';
import { NavigationEnd, Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AvatarModule, ButtonModule, BadgeModule, RouterModule, CommonModule, Menubar],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
isLoggedIn: boolean = false;

  items: MenuItem[] | undefined;

  constructor(private router: Router,private authservice: AuthService) { }
  ngOnInit() {
    // Check if the token exists in localStorage
    this.authservice.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        route:"/books"
      },
      {
        label: 'MyPurchases',
        icon: 'pi pi-shopping-cart', // Changed icon to a shopping cart
        route: "/myPurchases"
      },
      {
        label: 'MyBorrows',
        icon: 'pi pi-book', // Changed icon to a book
        route: "/myBorrows"
      }
     ,
      {
        label: 'Api',
        icon: 'pi pi-link',
        items: [
          {
            label: 'Documentation',
            url: 'https://openlibrary.org/developers/api'
          },
          {
            label: 'Exemple ',
            url: 'https://openlibrary.org/subjects/fantasy.json'
          },
         
        ]
      }
    ];
  }
  logout() {
    // Call the logout method from AuthService
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
}
