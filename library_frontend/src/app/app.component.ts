import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common'; // Add this import
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "./component/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'library';
  books: any[] = []; // To store the list of books

  constructor() { }

  ngOnInit(): void {
    
  }
}
