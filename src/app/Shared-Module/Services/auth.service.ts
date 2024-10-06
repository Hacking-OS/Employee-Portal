import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { LoginResponse } from '../../User-Module/user-login/models/loginResponse.model';

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
  getUserInfo(): Object {
    if (typeof window !== 'undefined') {
    return JSON.parse(sessionStorage.getItem('userInfo')!);
    // this.userInfoSubject.next(info);
    } // Update the BehaviorSubject
    return {}
  }

  setToken(item:LoginResponse):void{
    sessionStorage.setItem('accessToken',item.accessToken);
    (sessionStorage.getItem('refreshToken')!) ? null :sessionStorage.setItem('refreshToken',item.refreshToken);
  }

  getToken():string {
    if(!sessionStorage.getItem('accessToken')&&!sessionStorage.getItem('refreshToken')) return '';
   return sessionStorage.getItem('accessToken')!;
  }
  // getToken():{accessToken:string,refreshToken:string}{
  //   if(!sessionStorage.getItem('accessToken')&&!sessionStorage.getItem('refreshToken')) return {accessToken:'',refreshToken:''};
  //  return {
  //   accessToken:sessionStorage.getItem('accessToken')!,
  //   refreshToken:sessionStorage.getItem('refreshToken')!
  //   }
  // }

  clearUserInfo(): void {
    sessionStorage.removeItem('userInfo');
    this.userInfoSubject.next(null);
  }
}
