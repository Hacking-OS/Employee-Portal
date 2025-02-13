import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { RequestHandlerService } from './request-handler.service';
import { environment } from '../../../enviroment/environment';
import { Router } from '@angular/router';

@Injectable()
export class SharedEndPointService extends RequestHandlerService {

  constructor(http: HttpClient, authService: AuthService , router:Router) {
    super(http, authService,router);  // Correctly pass the http to the base class
  }

  GetApiResponse<Response, OtherParams = any>(apiPath: string, obj: OtherParams): Observable<Response> {
    const url = `${environment.baseUrl}/${apiPath}`;  // Construct the URL dynamically

    const headers = {
      headers : new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthService().getToken()}`
    })
  };

    return this.http.post<Response>(url, obj, { ...headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP error occurred:', error.message);
        return this.HandleError<Response | HttpErrorResponse>(error, () => this.GetApiResponse(apiPath, obj));
      })
    );
  }
}
