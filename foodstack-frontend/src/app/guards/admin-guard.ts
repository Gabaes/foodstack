import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get<any>('http://localhost:8080/me').pipe(
    map(usuario => {
      if (usuario.role === 'ROLE_ADMIN') {
        return true;
      }

      router.navigate(['/acesso-negado']);
      return false;
    }),
    catchError((error) => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};