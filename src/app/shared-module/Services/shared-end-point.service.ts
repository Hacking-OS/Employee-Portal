import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../Enviroment/environment';

@Injectable({
  providedIn: 'root'  // Ensure this service is provided in the root injector
})
export class SharedEndPointService {
  constructor(private http: HttpClient) { }

  GetApiResponse<Response, OtherParams = any>(apiPath: string, obj: OtherParams): Observable<Response> {
    const url = `${environment.baseUrl}/${apiPath}`;  // Construct the URL dynamically

    return this.http.post<Response>(url, obj).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP error occurred:', error.message);  // Log the error message
        return throwError(() => new Error(`Error occurred: ${error.message}`));  // Return a new error observable
      })
    );
  }
}
