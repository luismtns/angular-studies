import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const usertoken = localStorage.getItem('user-token');
  if (!usertoken) {
    router.navigateByUrl('login');
  }
  return true;
};
