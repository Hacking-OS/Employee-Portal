import { NotificationService } from './../Components/notification/notification.AlertService';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// export class ErrorHandlerService extends ErrorHandler {
export class ErrorHandlerService extends ErrorHandler {
  constructor(private notificationService: NotificationService) {
    super();
  }

  override handleError(error: any): void {
    this.errorShowMessage(error);
  }

  // errorShowMessage(error:HttpErrorResponse) : void {
  //   if (typeof error.error === 'object') {
  //     if (error.status === 400 || error.status === 401 || error.status === 403 || error.status === 404 || error.status === 405 || error.status === 406) {
  //       if (error.error?.message.includes('token')) {
  //         this.notificationService.addAlert({type:'error',title:"Authentication Failed!",message:"Session Expired"});
  //         return;
  //       }
  //       this.notificationService.addAlert({type:'error',message:error.error.message ?? error.error[0] ?? error?.message});
  //     } else {
  //       console.error(error.error.message ?? error.error[0] ?? error?.message);
  //     }
  //   } else if (typeof error.error === 'string') { {
  //     this.notificationService.addAlert({type:'error',message:error.error});
  //    }
  //  }
  // }

  errorShowMessage(error: HttpErrorResponse): void {
    const err = error.error;

    // Case 1: If error is an object (usually structured response from API)
    if (typeof err === 'object') {
      const status = error.status;

      // Handle known error status codes
      if ([400, 401, 403, 404, 405, 406].includes(status)) {
        const message = err?.message || err[0] || error.message;

        if (message?.toLowerCase().includes('token')) {
          this.notificationService.addAlert({
            type: 'error',
            title: 'Authentication Failed!',
            message: 'Session Expired',
          });
          return;
        }

        this.notificationService.addAlert({
          type: 'error',
          message: message || 'An error occurred.',
        });
      } else {
        // Unhandled status codes
        console.error(err?.message || err[0] || error.message);
      }
    }

    // Case 2: If error is a plain string (like raw error body)
    else if (typeof err === 'string') {
      this.notificationService.addAlert({
        type: 'error',
        message: err,
      });
    }

    // Case 3: Fallback
    else {
      this.notificationService.addAlert({
        type: 'error',
        message: 'An unexpected error occurred.',
      });
    }
  }
}
