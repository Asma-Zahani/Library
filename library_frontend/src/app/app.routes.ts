import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { BookComponent } from './component/book/book.component';
import { BookDetailsComponent } from './component/book-details/book-details.component';
import { DashboardComponent } from './component/Admin_Dachboard/dashboard/dashboard.component';
import { AddBookComponent } from './component/Admin_Dachboard/add-book/add-book.component';
import { TableComponent } from './component/Admin_Dachboard/table/table.component';
import { AddUserComponent } from './component/Admin_Dachboard/add-user/add-user.component';
import { AddCategoryComponent } from './component/Admin_Dachboard/add-category/add-category.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MyPurchasesComponent } from './component/my-purchases/my-purchases.component';
import { MyBorrowsComponent } from './component/my-borrows/my-borrows.component';
import { authGuard } from './auth/auth.guard';
import { authAdminGuard } from './auth/auth-admin.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'books', component: BookComponent },
    { path: 'book/:id', component: BookDetailsComponent },
    { path: 'myPurchases', component: MyPurchasesComponent, canActivate: [authGuard] },
    { path: 'myBorrows', component: MyBorrowsComponent, canActivate: [authGuard] },
   

    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'books', pathMatch: 'full' },
            { path: 'addBook', component: AddBookComponent },
            { path: 'editBook/:id', component: AddBookComponent },
            { path: 'books', component: TableComponent },
            { path: 'users', component: TableComponent },
            { path: 'addUser', component: AddUserComponent },
            { path: 'editUser/:id', component: AddUserComponent },
            { path: 'categories', component: TableComponent },
            { path: 'addCategory', component: AddCategoryComponent },
            { path: 'editCategory/:id', component: AddCategoryComponent },
            { path: 'purchases', component: TableComponent },
            { path: 'borrows', component: TableComponent },
        ],
        canActivate: [authAdminGuard]

    },

    { path: '**', redirectTo: 'login' }, // Global fallback route
];
