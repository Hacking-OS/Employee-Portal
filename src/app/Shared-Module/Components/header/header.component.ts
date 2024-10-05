import { AuthService } from './../../Services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 userInfo:any;
 constructor(@Inject(PLATFORM_ID) private platformId: Object,private authService:AuthService) {}
  ngOnInit(): void {
    // this.userInfo = this.authService.getUserInfo();
    this.userInfo = this.authService.getUserInfo();

  }
}
