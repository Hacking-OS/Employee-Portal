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
    },
    groupID: 0
  };
  EmployeeTeamListing:Array<{id:string,teamId:string,name:string}> = [];
  EmployeeTeamGroupListing:Array<any> = [];

  constructor(private sharedService:SharedService,private notificationService:NotificationService,private router:Router,private authService:AuthService){}

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getTeamPositionListing();
  this.getTeamGroupNames();
 }

  onSubmit() {
    // this.employee.adminID = this.authService.getUserInfo()?.userId || '';
    this.sharedService.getDataAndSetList<Employee>(() => this.sharedService.GetApiResponse<Employee,{Employee:Employee,IsAdmin:boolean,adminID:string,groupID:number}>('api/Employees/AddEmployee',{Employee:this.employee,IsAdmin:this.authService.getUserInfo()?.isAdmin! , adminID:this.authService.getUserInfo()?.userId || '',groupID:this.employee.groupID}), (response: Employee) => {
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


    getTeamGroupNames(){
      this.sharedService.getDataAndSetList<Array<any>>(() => this.sharedService.GetApiResponse<Array<any>,null>('api/Employees/getTeamGroups',null), (response: Array<any>) => {
          this.EmployeeTeamGroupListing = response;
      });
    }
}
