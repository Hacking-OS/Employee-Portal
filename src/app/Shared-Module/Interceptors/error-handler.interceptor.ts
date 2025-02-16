import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../Components/notification/notification.AlertService';
import { AuthService } from '../Services/auth.service';
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const alert = inject(NotificationService);

  return next(req).pipe(
    catchError((error) => {
      console.error(`❌ API Error:`, error);
     if (error.status === 404) {
        if(typeof error === 'object') {
          alert.addAlert({type:'error',message:error.error.toString()});
        } else {
          alert.addAlert({type:'error',message: error.toString()});
        }
        // alert('Requested resource not found!');
      } else if (error.status >= 500) {
        // alert('Server error! Please try again later.');
      } else {
        // alert('Something went wrong! Please try again.');
      }

      return throwError(() => error);
    })
  );
};
