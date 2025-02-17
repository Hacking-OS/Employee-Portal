import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Employee } from '../Models/Employee.model';
import { SharedService } from '../../../Shared-Module/Services/shared.service';
import { NotificationService } from '../../../Shared-Module/Components/notification/notification.AlertService';
import { Router } from '@angular/router';
import { AuthService } from '../../../Shared-Module/Services/auth.service';
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
    refreshTokenExpirationDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    userAuthDetails: {
      isAdmin: false,
      isTeamLead: false,
      isUser: false
    }
  };
  EmployeeTeamListing:Array<{id:string,teamId:string,name:string}> = [];

  constructor(private sharedService:SharedService,private notificationService:NotificationService,private router:Router,private authService:AuthService){}

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getTeamPositionListing();
 }

  onSubmit() {
    this.sharedService.getDataAndSetList<Employee>(() => this.sharedService.GetApiResponse<Employee,{Employee:Employee,IsAdmin:boolean}>('api/Employees/AddEmployee',{Employee:this.employee,IsAdmin:this.authService.getUserInfo()?.isAdmin!}), (response: Employee) => {
        this.notificationService.addAlert({ type: 'success',  message: 'Employee Added SuccessFully !'});
        setTimeout(()=>{
          this.router.navigate(['page','listing']);
        },5000);
      });
  }

    getTeamPositionListing(){
      this.sharedService.getDataAndSetList<Array<{id:string,teamId:string,name:string}>>(() => this.sharedService.GetApiResponse<Array<{id:string,teamId:string,name:string}>,null>('api/Employees/getTeamList',null), (response: Array<{id:string,teamId:string,name:string}>) => {
          this.EmployeeTeamListing = response;
      });
    }
}
