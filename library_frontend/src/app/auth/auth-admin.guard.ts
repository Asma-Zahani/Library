import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
export const authAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is authenticated and has admin role
  if (authService.isAuthenticated() && authService.isAdmin()) {

    return true;
  } else {
    // Redirect to login or forbidden page if not authenticated or not admin
    router.navigate(['/login']);
    return false;
  }
};
