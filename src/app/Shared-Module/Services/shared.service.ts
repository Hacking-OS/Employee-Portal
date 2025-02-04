import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SharedEndPointService } from './shared-end-point.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedEndPointService:SharedEndPointService;
  constructor(http:HttpClient,router:Router,auth:AuthService) {
    this.sharedEndPointService = new SharedEndPointService(http,auth,router);
   }

  GetApiResponse<responseType, T>(path: string, obj: T): Observable<responseType> {
    return this.sharedEndPointService.GetApiResponse<responseType, T>(path, obj);
  }

  async getDataAndSetList<T>(Subscrible_Observable: () => Observable<T>, Observable_Response: (responseData: T) => void,Error?:(error:HttpErrorResponse) => void): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      Subscrible_Observable().pipe(tap((response: T) => Observable_Response(response))).subscribe({
        next: (response: T) => resolve(response),
        error: (error: HttpErrorResponse) => {
          (Error) ? Error(error) : null;
          reject(error);
        }
      });
    });
  }
}
