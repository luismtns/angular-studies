import { catchError, tap } from 'rxjs';

import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const feedbackInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && (event.body as any)?.message) {
        snackBar.open((event.body as any)?.message, 'Fechar', {
          duration: 3000,
          panelClass: (event.body as any)?.result == false ? ['error-snackbar'] : undefined,
        });
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse && error.message)
        snackBar.open(`${error.message}`, 'Fechar', {
          duration: 0,
          panelClass: ['error-snackbar'],
        });
      throw new Error(error.message);
    })
  );
};
