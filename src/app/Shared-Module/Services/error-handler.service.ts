import { NotificationService } from './../Components/notification/notification.AlertService';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService extends ErrorHandler {

  constructor(private notificationService:NotificationService) {
    super();
  }

  override handleError(error: any): void {
       this.errorShowMessage(error);
  }

  errorShowMessage(error:HttpErrorResponse) : void {
    if (typeof error.error === 'object') {
       this.notificationService.addAlert({type:'error',message:error.error.message});
    } else if (typeof error.error === 'string') { {
      this.notificationService.addAlert({type:'error',message:error.error});
     }
   }
  }
}
