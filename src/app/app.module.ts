import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NotificationComponent } from './shared-module/Components/notification/notification.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
// import { ListingComponent } from './shared-module/Components/listing/listing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NotificationService } from './shared-module/Components/notification/notification.AlertService';
import { SharedService } from './Shared-Module/Services/shared.service';
// import { SharedEndPointService } from './Shared-Module/Services/shared-end-point.service';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
// import { NotificationComponent } from './Shared-Module/Components/notification/notification.component';
import { UserModule } from './User-Module/user.module';
import { SharedModule } from './Shared-Module/shared.module';
import { UserExistsGuard } from './Shared-Module/Guards/user-exist.guard';
import { UserDoesNotExistGuard } from './Shared-Module/Guards/user-doesnot-exist.guard';
import { AuthService } from './Shared-Module/Services/auth.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ManagementModule } from './Management-Module/management.module';
import { ErrorHandlerService } from './Shared-Module/Services/error-handler.service';
import { BusyInterceptor } from './Shared-Module/Interceptors/busy.interceptor';

@NgModule({
  declarations: [AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    NgxMaskDirective,    // Add mask directive
    NgxMaskPipe,
    SharedModule,
    UserModule,
    ManagementModule
  ],
  providers: [
    provideHttpClient(),
    // NotificationService,
    provideNgxMask(),
    AuthService,
    SharedService,
    // SharedEndPointService,
    UserDoesNotExistGuard,UserExistsGuard,
    { provide:ErrorHandler, useClass:ErrorHandlerService },
    // { provide: HTTP_INTERCEPTORS, useClass: BusyInterceptor, multi: true },
    // { provide:ErrorHandlerService, useClass:ErrorHandler , multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
