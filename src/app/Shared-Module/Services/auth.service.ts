import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfoSubject: BehaviorSubject<string | null>;

  constructor() {
    if (typeof window !== 'undefined') {
    const storedUserInfo = sessionStorage.getItem('userInfo') ?? null;
    this.userInfoSubject = new BehaviorSubject<string | null>(storedUserInfo);
    } else{
      this.userInfoSubject = new BehaviorSubject<string | null>(null);
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (typeof window !== 'undefined') {
    const storedUserInfo = sessionStorage.getItem('userInfo') ?? null;
    this.userInfoSubject = new BehaviorSubject<string | null>(storedUserInfo);
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.userInfoSubject.asObservable().pipe(
      map(userInfo => userInfo !== null)
    );
  }

  setUserInfo(info: string): void {
    if (typeof window !== 'undefined') {
    sessionStorage.setItem('userInfo', info);
    this.userInfoSubject.next(info);
    } // Update the BehaviorSubject
  }

  clearUserInfo(): void {
    sessionStorage.removeItem('userInfo');
    this.userInfoSubject.next(null);
  }
}
