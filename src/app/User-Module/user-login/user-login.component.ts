import { AuthService } from './../../Shared-Module/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
// import { NotificationService } from '../../shared-module/Components/notification/notification.AlertService';
// import { SharedService } from '../../shared-module/Services/shared.service';
import { LoginResponse } from './models/loginResponse.model';
// import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../Shared-Module/Components/notification/notification.AlertService';
import { SharedService } from '../../Shared-Module/Services/shared.service';
import { Employee } from '../../Management-Module/Employees/Models/Employee.model';

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
  isSubmitting:boolean=false;
  employeeDetails: Employee | null = null;
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
    this.isSubmitting=true;
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.sharedService.getDataAndSetList(() => this.sharedService.GetApiResponse<LoginResponse, { email: string; password: string }>('api/Employees/Login', loginData), (response: LoginResponse) => {
            console.log(response);
            this.notification.addAlert({ type: 'success',  message: 'Login Successful!' });
            // sessionStorage.setItem('userInfo', JSON.stringify(response));
            this.authService.setUserInfo(JSON.stringify(response.employee));
            this.authService.setToken(response);
            setTimeout(()=>{
              this.isSubmitting=false;
              this.router.navigate(['/page/listing']);
            }, 3000);
          },(error)=> {
            this.isSubmitting=false;
            this.notification.addAlert({ type: 'error',  message: 'Unable To Login!' });
          });
    }
  }

  redirectToSignup() {
    this.router.navigate(['/signup']);
  }

  // redirectToEmployeeDetails(): void {
  //   // Implement your navigation logic here, e.g.:
  //   // this.router.navigate(['/employee-details']);
  //   console.log('Redirecting to employee details...');
  // }
}
