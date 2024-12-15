import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../../enviroment/environment';
import { TokenModel } from '../Schemes/Interfaces/refreshToken.interface';
import { Router } from '@angular/router';

// @Injectable()
// export class RequestHandlerService {

//   private url:string=`${environment.baseUrl}/api/Employees/refreshToken`;
//   constructor(public http:HttpClient,private authService:AuthService,private router:Router) {
//     this.authService = authService;
//   }

//   // Handler

//   HandleError<T = any>(error:HttpErrorResponse,continuation: () => Observable<T>):Observable<any>{
//     const options = {
//       headers: new HttpHeaders({
//         'Authorization': `Bearer ${this.getAuthService().getToken()}`
//       })
//     }
//     let token:TokenModel={
//       accessToken:sessionStorage.getItem('accessToken')!,
//       refreshToken:sessionStorage.getItem('refreshToken')!
//     }
//     // let token:string = "dgsoihsdoifn owef hweirn wq9rqjhw3knr oq2321oj o21ij 0joiwjqwoq2j rqwopiqjroiqu[;f]/s'f;sd][f;s][f]s[;";
//     if(error.status===403 || error.status===401){
//       return this.http.post<T>(this.url,token,{...options}).pipe(
//         switchMap((response:any)=>{
//           this.authService.setToken(response);
//           return continuation();
//         }),
//         catchError(error=> {
//           return this.handleExpiredToken(error);
//         })
//        );
//     } else{
//       return throwError(()=>error) as Observable<HttpEvent<HttpErrorResponse>>;
//     }

//   }

//   handleExpiredToken(error:HttpErrorResponse):Observable<HttpEvent<HttpErrorResponse>>{
//     this.authService.clearUserInfo();
//     localStorage.clear();
//     sessionStorage.clear();
//     this.router.navigate(['/user/login']);
//     return throwError(()=>error) as Observable<HttpEvent<HttpErrorResponse>>;
//   }

//   protected getAuthService(): AuthService {
//     return this.authService;
//   }
// }

@Injectable()
export class RequestHandlerService {

  private url: string = `${environment.baseUrl}/api/Employees/refreshToken`;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<TokenModel | null> = new BehaviorSubject<TokenModel | null>(null);

  constructor(
    protected http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  // Handle Error and Refresh Token
  HandleError<T = any>(error: HttpErrorResponse, continuation: () => Observable<T>): Observable<any> {
    if (error.status === 401 || error.status === 403) {
      return this.handleTokenRefresh(continuation);
    } else {
      return throwError(() => error) as Observable<HttpEvent<HttpErrorResponse>>;
    }
  }

  // Manage Token Refresh and Retry Failed Requests
  private handleTokenRefresh<T = any>(continuation: () => Observable<T>): Observable<T> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);  // Ensure it's cleared before refreshing

      const token: TokenModel = {
        accessToken: sessionStorage.getItem('accessToken')!,
        refreshToken: sessionStorage.getItem('refreshToken')!
      };

      return this.http.post<TokenModel>(this.url, token).pipe(
        switchMap((response: any) => {
          // Refresh successful, save new token
          this.authService.setToken(response);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response);  // Emit new token to waiting requests

          return continuation();  // Retry the original failed request
        }),
        catchError(error => {
          // Handle token refresh failure
          this.isRefreshing = false;
          this.handleExpiredToken(error);
          return throwError(() => error);
        })
      );
    } else {
      // Wait for the token refresh to complete and retry the original request
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),  // Wait until the new token is emitted
        switchMap(() => continuation())  // Retry with new token
      );
    }
  }

  // Handle token expiration
  private handleExpiredToken(error: HttpErrorResponse): Observable<HttpEvent<HttpErrorResponse>> {
    let errors = (typeof error.error === 'object') ? error.error : {message:''};
    if (error.status === 401 || error.status === 403 && ((error.error && typeof error.error  === 'object') && errors.message.includes('token'))) {
      this.authService.logout();
      this.router.navigate(['/user/login']);
      return throwError(() => 'Session expired') as Observable<HttpEvent<HttpErrorResponse>>;
    }
    return throwError(() => error) as Observable<HttpEvent<HttpErrorResponse>>;
  }


  protected getAuthService(): AuthService {
    return this.authService;
  }
}

