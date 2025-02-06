import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { AuthService } from '../Services/auth.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class UserExistsGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   const isAuthenticated = this.authService.isAuthenticated(); // Assuming this is synchronous
  //   console.log(isAuthenticated);
  //   if (isAuthenticated) {
  //     // this.router.navigate(['/Home']); // Redirect if user is authenticated
  //     return of(true);
  //   }
  //   return of(false);
  // }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          console.log('User is Authenticated. Can be Redirected to /Home...');
          this.router.navigate(['/page/home']);
          return false; // Prevent navigation to the requested route
        }
        // this.router.navigate(['/page/Home']);
        return true; // Allow navigation to the requested route
      }),
      catchError(error => {
        console.error('Error occurred during authentication check:', error);
        // this.router.navigate(['/page/Home']);
        return of(false); // Prevent navigation if there's an error
      })
    );
  }
}
