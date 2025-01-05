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

  async getDataAndSetList<T>(getData: () => Observable<T>, setData: (responseData: T) => void): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      getData().pipe(
        tap((response: T) => setData(response)),
        catchError((error: HttpErrorResponse) => {
          console.error('HTTP error occurred:', error);
          return throwError(() => error);
          // return throwError(() => new Error('Error occurred while fetching data.'));
        })
      ).subscribe({
        next: (response: T) => resolve(response),
        error: (error: any) => reject(error)
      });
    });
  }
}
