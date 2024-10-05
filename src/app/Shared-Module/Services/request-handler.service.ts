import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../../enviroment/environment';
import { TokenModel } from '../Schemes/Interfaces/refreshToken.interface';

@Injectable()
export class RequestHandlerService {

  private url:string=`${environment.baseUrl}/api/Employees/refreshToken`;
  constructor(public http:HttpClient,private authService:AuthService) {
    this.authService = authService;
  }

  // Handler

  HandleError<T = any>(error:HttpErrorResponse,continuation: () => Observable<T>):Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getAuthService().getToken()}`
      })
    }
    let token:TokenModel={
      accessToken:sessionStorage.getItem('accessToken')!,
      refreshToken:sessionStorage.getItem('refreshToken')!
    }
    // let token:string = "dgsoihsdoifn owef hweirn wq9rqjhw3knr oq2321oj o21ij 0joiwjqwoq2j rqwopiqjroiqu[;f]/s'f;sd][f;s][f]s[;";
    if(error.status===403 || error.status===401){
      return this.http.post<T>(this.url,token,{...options}).pipe(
        switchMap((response:any)=>{
          this.authService.setToken(response);
          return continuation();
        }),
        catchError(error=> {
          return this.handleExpiredToken(error);
        })
       );
    } else{
      return throwError(()=>error) as Observable<HttpEvent<HttpErrorResponse>>;
    }

  }

  handleExpiredToken(error:HttpErrorResponse):Observable<HttpEvent<HttpErrorResponse>>{
    localStorage.clear();
    sessionStorage.clear();
    return throwError(()=>error) as Observable<HttpEvent<HttpErrorResponse>>;
  }

  protected getAuthService(): AuthService {
    return this.authService;
  }
}
