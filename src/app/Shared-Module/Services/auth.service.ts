import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfo: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') { // Ensure window is available
      this.userInfo = sessionStorage.getItem('userInfo');
    }
  }

  isAuthenticated(): Observable<boolean> {
    return of(this.userInfo !== null);
  }

  setUserInfo(info: string): void {
    if (typeof window !== 'undefined') { // Ensure window is available
      sessionStorage.setItem('userInfo', info);
      this.userInfo = info;
    }
  }

  clearUserInfo(): void {
    if (typeof window !== 'undefined') { // Ensure window is available
      sessionStorage.removeItem('userInfo');
      this.userInfo = null;
    }
  }
}
