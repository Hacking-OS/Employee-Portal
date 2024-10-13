import { AuthService } from './../../Services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../Services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notification/notification.AlertService';
import { gridListingParams, updateEmployeeParams } from '../../Schemes/models/listing.model';
import { IUserInfo } from '../../Schemes/Interfaces/userInfo.interface';
declare var bootstrap: {
  Modal: new (element: HTMLElement, options?: Partial<ModalOptions>) => ModalInstance;
};

interface ModalOptions {
  backdrop?: boolean | 'static';
  keyboard?: boolean;
  focus?: boolean;
}

interface ModalInstance {
  show(): void;
  hide(): void;
  toggle(): void;
  handleUpdate(): void;
}

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent implements OnInit {

  @ViewChild('ModelPopup') ModelPopup!: ElementRef;
  private modelPopupInstance!: ModalInstance;
  list: gridListingParams[] = [];
  updateUser: gridListingParams={
    id: 0,
    userId:'',
    userName: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    salary: 0,
    isAdmin: false,
    isTeamAdmin: false,
    isUser: false,
     teamName: ''
  };
  userInfo : IUserInfo ={
    id: 0,
    userId: '',
    userName: '',
    email: '',
    assignedTeamID: '',
    refreshToken: '',
    isAdmin: false,
    isTeamAdmin: false,
    isUser: false,
    teamName: ''
  }
  displayedColumns: string[]=[]; // Columns to display
  constructor(private sharedService: SharedService, private notificationService: NotificationService,private authService:AuthService) { }
  ngOnInit(): void {
    this.getGridListing();
    this.userInfo = this.authService.getUserInfo()!;
    if(this.userInfo.isAdmin){
     this.displayedColumns = ['id', 'name', 'email', 'phone', 'salary', 'actions'];
    } else {
     this.displayedColumns = ['id', 'name', 'position', 'actions'];
    }
  }
  onEdit(item: gridListingParams) {
    console.log('item');
    console.log(item);
    // new bootstrap(this.)
    this.updateUser = item;
    this.modelPopupInstance.show();
    this.notificationService.addAlert({ type: 'info', message: 'info: '+ item.name })
}
  onDelete(item: gridListingParams) {
    console.log('item');
    console.log(item);
    this.notificationService.addAlert({ type: 'error', message: 'Error: ' + item.name});
  }


  updateEmployeeFromPopup(){
    let params:updateEmployeeParams=new updateEmployeeParams();
    params.id=this.updateUser.id;
    params.userId=this.updateUser.userId;
    params.email=this.updateUser.email;
    params.name=this.updateUser.name;
    params.phone=this.updateUser.phone;
    params.salary=this.updateUser.salary;
    params.password=this.updateUser.password;
    this.sharedService.getDataAndSetList(() => this.sharedService.GetApiResponse<Array<Object>, updateEmployeeParams>('api/Employees/updateEmployee', params), (response: any | HttpErrorResponse) => {
      if (response instanceof HttpErrorResponse) {
        this.notificationService.addAlert({ type: 'error',  message: 'Error: ' + JSON.stringify(response.error)});
      } else {
        this.notificationService.addAlert({type:'success',message:"User " + response.name +" updated Successfully!"});
        this.getGridListing();
        this.modelPopupInstance.hide();
      }
    }).catch((error: HttpErrorResponse) => {
    })
  }

  ngAfterViewInit(): void {
    // Initialize modals
    this.modelPopupInstance = new bootstrap.Modal(this.ModelPopup.nativeElement, {
      backdrop: 'static',
      keyboard: false
    });
  }

  getGridListing(){
    this.sharedService.getDataAndSetList(() => this.sharedService.GetApiResponse<Array<Object>, {id:string}>('api/Employees/GetEmployees',{id:this.authService.getUserInfo()!?.userId}), (response: any | HttpErrorResponse) => {
      if (response instanceof HttpErrorResponse) {
        this.notificationService.addAlert({ type: 'error',  message: 'Error: ' + JSON.stringify(response.error)});
      } else {
        this.list = response;
      }
    }).catch((error: HttpErrorResponse) => {
    });
  }
}
