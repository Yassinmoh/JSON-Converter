import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router: Router = inject(Router);
  let isLogin = !!localStorage.getItem('token');

  if (!isLogin) {
    return _router.createUrlTree(['login'])
  }
  return true

};
