import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedRoutingModule } from './shared-routing.module';
import { ListingComponent } from './Components/listing/listing.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { NotificationService } from './Components/notification/notification.AlertService'; // Update import path
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './Components/home/home.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HeaderComponent } from './Components/header/header.component';
import { MatSelectModule } from '@angular/material/select';
import { LoaderComponent } from './Components/loader/loader.component';
import { BusyInterceptor } from './Interceptors/busy.interceptor';

@NgModule({
  declarations: [
    ListingComponent,
    NotificationComponent,
    HomeComponent,
    HeaderComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    NgxMaskDirective,    // Add mask directive
    NgxMaskPipe,
    MatSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BusyInterceptor, multi: true },
    provideNgxMask(),provideHttpClient(),NotificationService
  ], // Provide the service here
  exports: [
    ListingComponent,
    NotificationComponent,
    HomeComponent,
    HeaderComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
