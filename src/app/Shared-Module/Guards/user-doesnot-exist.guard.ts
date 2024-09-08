import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class UserDoesNotExistGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   const isAuthenticated = this.authService.isAuthenticated(); // Assuming this is synchronous
  //   console.log(isAuthenticated);
  //   if (!isAuthenticated) {
  //     this.router.navigate(['/page/Home']);
  //     // this.router.navigate(['/user/login']); // Redirect if user is not authenticated
  //     return of(true);
  //   }
  //   return of(false);
  // }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          console.log('User is not authenticated. Redirecting to /Home...');
          return true; // Prevent navigation to the requested route
        }
        this.router.navigate(['/page/Home']);
        return false; // Allow navigation to the requested route
      }),
      catchError(error => {
        console.error('Error occurred during authentication check:', error);
        this.router.navigate(['/page/Home']);
        return of(false); // Prevent navigation if there's an error
      })
    );
  }
}
