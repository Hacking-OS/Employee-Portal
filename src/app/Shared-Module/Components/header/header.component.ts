import { AlertMessage } from './../notification/notification.AlertService';
import { AuthService } from './../../Services/auth.service';
// import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { IUserInfo } from '../../Schemes/Interfaces/userInfo.interface';
import { NotificationService } from '../notification/notification.AlertService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 userInfo:IUserInfo = {
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
 };
 constructor(@Inject(PLATFORM_ID) private platformId: Object,private authService:AuthService,private notify:NotificationService) {
  this.userInfo = this.authService.getUserInfo()!;
 }
  ngOnInit(): void {
    // this.userInfo = this.authService.getUserInfo();


  }
  logout(){
    this.notify.addAlert({type:'success',message:"User Has Logged out Successfully ! "});
    this.authService.logoutUser();
    setTimeout(()=>window.location.reload(),3500);
  }
}
