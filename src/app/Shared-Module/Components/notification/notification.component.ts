import { Component, SimpleChanges } from '@angular/core'; // Adjust the path as needed
import { Observable } from 'rxjs';
import { AlertMessage, NotificationService } from './notification.AlertService';

@Component({
  selector: 'app-notification',
  template: `
 <div class="notification-container">
  <div *ngFor="let alert of alerts$ | async; let i = index" class="notification-toast"
       [ngClass]="{
         'alert-success': alert.type === 'success',
         'alert-error': alert.type === 'error',
         'alert-info': alert.type === 'info'
       }">
    <button class="close-btn" (click)="closeNotification(i)">x</button>
    <b>{{ alert.title?alert.title:alert.type }}</b> <br>
   <span class='small'> {{ alert.message }}</span>
  </div>
</div>
    <!-- <button (click)="clearAlerts()">Clear Alerts</button> -->
  `,
  styles: [`
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99991;
  display: flex;
  flex-direction: column;
  width: 15%;
  gap: 10px;
  opacity: 0.89;
}

.notification-toast {
  position: relative;
  padding: 16px 20px;
  border-radius: 6px;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  transform: translateY(0);
  font-size: 14px;
  // display: flex;
  align-items: center;
  justify-content: space-between;
}

.notification-toast.alert-success {
  background-color: #4caf50; /* Green */
}

.notification-toast.alert-error {
  background-color: #f44336; /* Red */
}

.notification-toast.alert-info {
  background-color: #2196f3; /* Blue */
}

.close-btn {
  position: absolute;
  top: 17%;
  right: 7px;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  font-size: 15px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s ease-in-out;
}

.close-btn:hover {
  opacity: 1;
}

.small {
  font-size: 12px;
  font-weight:bold;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .notification-container {
    width: 80%;
    right: 10%;
  }

  .notification-toast {
    font-size: 12px;
    padding: 12px 16px;
  }

  .close-btn {
    font-size: 14px;
  }
}


  `]
})
export class NotificationComponent {
  alerts$: Observable<AlertMessage[]>=new Observable<AlertMessage[]>();

  constructor(private notificationService: NotificationService) {
  }
  ngOnInit(): void {
    // Declare without initializing it in the constructo

      // Initialize alerts$ here after the service is properly injected
      this.alerts$ = this.notificationService.alerts$;
    this.alerts$.subscribe(alerts => {
      alerts.forEach((alert, index) => {
        // Set a timeout for each notification to automatically close after 5 seconds
        setTimeout(() => {
          this.closeNotification(index);
        }, 5000); // 5 seconds before auto-close
      });
    });
  }

  clearAlerts() : void {
    this.notificationService.clearAlerts();
  }



  closeNotification(index: number) : void {
    this.notificationService.closeNotification(index);
  }
}
