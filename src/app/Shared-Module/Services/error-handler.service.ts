import { NotificationService } from './../Components/notification/notification.AlertService';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// export class ErrorHandlerService extends ErrorHandler {
export class ErrorHandlerService extends ErrorHandler {

  constructor(private notificationService:NotificationService) {
    super();
  }

  override handleError(error: any): void {
       this.errorShowMessage(error);
  }

  errorShowMessage(error:HttpErrorResponse) : void {
    if (typeof error.error === 'object') {
      if (error.status === 400 || error.status === 401 || error.status === 403 || error.status === 404 || error.status === 405 || error.status === 406) {
        if (error.error[0].includes('token')) {
          this.notificationService.addAlert({type:'error',message:"Session Expired"});
        } else {
          this.notificationService.addAlert({type:'error',message:error.error.message ?? error.error[0] ?? error?.message});
        }
    
      } else {
        console.error(error.error.message ?? error.error[0] ?? error?.message);
      }
    } else if (typeof error.error === 'string') { {
      this.notificationService.addAlert({type:'error',message:error.error});
     }
   }
  }
}
