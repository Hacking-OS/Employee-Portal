import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../Shared-Module/Components/notification/notification.AlertService';
import { SharedService } from '../../../Shared-Module/Services/shared.service';
import { Employee } from '../Models/Employee.model';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../../../Shared-Module/Services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
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
  employeeData: any;
  isAllowChangeAssignment:boolean = false;

  constructor(private sharedService:SharedService,private notificationService:NotificationService,private router:Router,private authService:AuthService){}

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
   // First, try using Router (works if the component is freshly navigated to)
   const navigation = this.router.getCurrentNavigation();
   this.employeeData = navigation?.extras.state?.data;
   this.isAllowChangeAssignment = this.authService.getUserInfo()?.isAdmin! == true && this.authService.getUserInfo()?.isTeamAdmin! == true;
  //  this.employeeData = (navigation?.extras.state as any)?.data;

   // Fallback: If the above doesn't work (e.g., page refresh), use window.history.state
   if (!this.employeeData) {
     this.employeeData = window.history.state.data;
   }

   if (this.employeeData) {
     console.log('Employee Data:', this.employeeData);
   } else {
     console.log('No data found in state');
   }
 
  if (this.employeeData) {

  } else {
   this.router.navigate(['page','listing']);
   return;
  }

  this.getTeamPositionListing();
  this.getEmployeeByID();
 }

  onSubmit() : void {
    this.sharedService.getDataAndSetList<Employee>(() =>  this.sharedService.GetApiResponse<Employee, Employee>('api/Employees/updateEmployee', {   ...this.employee, 
          userAuthDetails: {  isAdmin: this.authService.getUserInfo()?.isAdmin!,  isTeamLead: this.authService.getUserInfo()?.isTeamAdmin! , isUser:this.authService.getUserInfo()?.isUser! } }), (response: Employee) => {
      this.notificationService.addAlert({
        type: 'success', 
        message: `Updated ${response.name.split(' ')[0]} Successfully!`
      });
    }).finally(()=>{
     setTimeout(()=> { this.router.navigate(['page', 'listing']); },3000);
    });
    
  }

    getTeamPositionListing(){
      this.sharedService.getDataAndSetList<Array<{id:string,teamId:string,name:string}>>(() => this.sharedService.GetApiResponse<Array<{id:string,teamId:string,name:string}>,null>('api/Employees/getTeamList',null), (response: Array<{id:string,teamId:string,name:string}>) => {
          this.EmployeeTeamListing = response;
      });
    }

    getEmployeeByID(){
      this.sharedService.getDataAndSetList<Employee>(() => this.sharedService.GetApiResponse<Employee,{id:string}>('api/Employees/GetEmployeesByID', {id:this.employeeData.userId}), (response: Employee) => {
          this.employee = response;
      });
    }

    getEmployeeAssignedRole () : string  {
      return this.EmployeeTeamListing.find(item => item.teamId === this.employee.assignedTeamID)?.name ?? '';
    }

    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.router.navigate(['page', 'listing'], { 
        state: { data: undefined }  // Ensure key 'data' doesn't have quotes unless necessary
      });
    }
}
