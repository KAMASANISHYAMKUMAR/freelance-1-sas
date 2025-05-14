import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const allowedRoles = route.data?.['roles'] as string[];
  
  if (authService.isAuthenticated() && authService.hasRole(allowedRoles)) {
    return true;
  }
  
  router.navigate(['/dashboard']);
  return false;
}; 