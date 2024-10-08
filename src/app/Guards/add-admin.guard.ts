import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const addAdminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const getToken: any = sessionStorage.getItem('token');
  let guardValue!: boolean;
  if (getToken) {
    const decodedToken: any = getToken.split('.')[1];
    const unDecodedToken: any = JSON.parse(atob(decodedToken));
    if (unDecodedToken.Role === 'Admin') {
      guardValue = true;
    } else {
      Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Access Denied',
        icon: 'error',
      }).fire();
      router.navigate(['/users']);
      guardValue = false;
    }
  }

  return guardValue;
};
