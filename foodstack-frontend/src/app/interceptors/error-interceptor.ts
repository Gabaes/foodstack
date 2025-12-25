import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); 

  return next(req).pipe(
    catchError((error) => {
      
      if (error.status === 403) {
        if (!router.url.includes('/login')) {
           router.navigate(['/acesso-negado']);
        }
      }
      
      if (error.status === 401) {
          router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};