import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedEndPointService } from './shared-module/Services/shared-end-point.service';
import { SharedService } from './shared-module/Services/shared.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet
  ],
  providers: [
    SharedService,
    SharedEndPointService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected property name
})
export class AppComponent {
  title = 'Employee-Portal';
}
