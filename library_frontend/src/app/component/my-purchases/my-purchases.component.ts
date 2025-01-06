import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-purchases',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule,],
  templateUrl: './my-purchases.component.html',
  styleUrl: './my-purchases.component.css'
})
export class MyPurchasesComponent implements OnInit {
  purchases: any[] = []; // Replace 'any' with your actual Purchase model

  constructor(private purchasesService: TransactionService, private router: Router) { }

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases(): void {
    this.purchasesService.getMyPurchasedBooks().subscribe({
      next: (response: any[]) => {
        console.log(response)
        this.purchases = response;  // Assign the response to the purchases array
        console.log('Purchases fetched successfully:', this.purchases);
      },
      error: (err) => {
        console.error('Error fetching purchases:', err);
      }
    });
    
  }
  downloadReceipts() {
    let content = 'My Purchases Receipts\n\n';  // Start the file content with a header

    // Loop through each purchase and add it to the text content
    this.purchases.forEach((purchase, index) => {
      content += `Receipt #${index + 1}\n`;
      content += `Title: ${purchase.book.title}\n`;
      content += `Price: ${purchase.price} USD\n`;
      content += `Date: ${purchase.transactionDate}\n`;

      // Check if categories exists and join them (extract category names)
      const categories = purchase.book.categories && purchase.book.categories.length > 0
        ? purchase.book.categories.map((category: { name: any; }) => category.name).join(', ')
        : 'No categories available';

      content += `Categories: ${categories}\n\n`;
    });

    // Create a Blob with the content and trigger the download
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'all_receipts.txt'; // Name of the file
    link.click();
  }
  viewBookDetails(bookId: string, id:number) {
    this.router.navigate(['/book', bookId], {
      queryParams: { id: id }
    });
  }
}
