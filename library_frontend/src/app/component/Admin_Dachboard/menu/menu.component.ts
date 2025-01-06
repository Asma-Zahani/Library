import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { Ripple } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
    imports: [PanelMenu, BadgeModule, Ripple, CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
items: MenuItem[] =[];

ngOnInit() {
    this.items = [
       
      {
          label: 'Items',
          icon: 'pi pi-envelope',
          items: [
              {
                  label: 'Books',
                  icon: 'pi pi-file-edit',
                  route: "/dashboard/books"
              },
              {
                  label: 'Categories',
                  icon: 'pi pi-inbox',
                  route: "/dashboard/categories"

              },
              {
                  label: 'Users',
                  icon: 'pi pi-send',
                  route: "/dashboard/users"

              },
              {
                  label: 'Borrows',
                  icon: 'pi pi-trash',
                  route: "/dashboard/borrows"

              },
              {
                  label: 'Purchases',
                  icon: 'pi pi-trash',
                  route: "/dashboard/purchases"

              }
          ]
      },
      {
          label: 'Add',
          icon: 'pi pi-chart-bar',
          items: [
              {
                  label: 'add book',
                  icon: 'pi pi-chart-line',
                  route: "/dashboard/addBook"
              },
              {
                  label: 'add Category',
                  icon: 'pi pi-list',
                  route: "/dashboard/addCategory"
              },
              {
                  label: 'add User',
                  icon: 'pi pi-list',
                  route: "/dashboard/addUser"
              }
          ]
      },
     
      
  ];
}

toggleAll() {
  const expanded = !this.areAllItemsExpanded();
  this.items = this.toggleAllRecursive(this.items, expanded);
}

private toggleAllRecursive(items: MenuItem[], expanded: boolean): MenuItem[] {
  return items.map((menuItem) => {
      menuItem.expanded = expanded;
      if (menuItem.items) {
          menuItem.items = this.toggleAllRecursive(menuItem.items, expanded);
      }
      return menuItem;
  });
}

private areAllItemsExpanded(): boolean {
  return this.items.every((menuItem) => menuItem.expanded);
}

}
