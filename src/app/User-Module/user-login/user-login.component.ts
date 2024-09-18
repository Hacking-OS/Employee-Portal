import { AuthService } from './../../Shared-Module/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
// import { NotificationService } from '../../shared-module/Components/notification/notification.AlertService';
// import { SharedService } from '../../shared-module/Services/shared.service';
import { LoginResponse } from './models/loginResponse.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../Shared-Module/Components/notification/notification.AlertService';
import { SharedService } from '../../Shared-Module/Services/shared.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  // styleUrls: ['./user-login.component.scss'],
  animations: [
    trigger('transitionMessages', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NotificationService,
    private sharedService: SharedService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.sharedService.getDataAndSetList(
        () => this.sharedService.GetApiResponse<LoginResponse, { email: string; password: string }>('api/Employees/Login', loginData),
        (response: LoginResponse | HttpErrorResponse) => {
          if (response instanceof HttpErrorResponse) {
            this.notification.addAlert({
              type: 'error',
              message: 'Error: ' + JSON.stringify(response.error)
            });
          } else {
            console.log(response);
            this.notification.addAlert({
              type: 'success',
              message: 'Login Successful!'
            });
            // sessionStorage.setItem('userInfo', JSON.stringify(response));
            this.authService.setUserInfo(JSON.stringify(response));
            setTimeout(()=>{
              this.router.navigate(['/page/listing']);
              // this.router.navigate(['/page/Home']);
            }, 4000);
          }
        }
      ).catch(error => {
        console.error('Login failed:', error);
        this.notification.addAlert({
          type: 'error',
          message: 'Error: ' + JSON.stringify(error)
        });
      });
    }
  }

  redirectToSignup() {
    this.router.navigate(['/signup']);
  }
}
