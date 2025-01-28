import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Employee } from '../Models/Employee.model';
import { SharedService } from '../../../Shared-Module/Services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../Shared-Module/Components/notification/notification.AlertService';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  employee: Employee = {
    userId: uuidv4(),
    name: '',
    email: '',
    password: '',
    phone: '',
    salary: 0,
    isAdmin: false,
    isTeamAdmin: false,
    isUser: true,
    refreshToken: '',
    assignedTeamID: uuidv4(),
    refreshTokenExpirationDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), // Default 2 days from now
  };
  EmployeeTeamListing:Array<{id:string,teamId:string,name:string}> = [];

  constructor(private sharedService:SharedService,private notificationService:NotificationService,private router:Router){}

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getTeamPositionListing();
 }

  onSubmit() {
    this.sharedService.getDataAndSetList(() => this.sharedService.GetApiResponse<Employee,Employee>('api/Employees/AddEmployee',this.employee), (response: any | HttpErrorResponse) => {
        this.notificationService.addAlert({ type: 'success',  message: 'Employee Added SuccessFully !'});
        setTimeout(()=>{
          this.router.navigate(['page','listing']);
        },5000);
      });
  }

    getTeamPositionListing(){
      this.sharedService.getDataAndSetList(() => this.sharedService.GetApiResponse<Array<{id:string,teamId:string,name:string}>,null>('api/Employees/getTeamList',null), (response: any) => {
          this.EmployeeTeamListing = response;
      });
    }
}
