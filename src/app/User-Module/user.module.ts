import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, provideHttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserSignupComponent } from "./user-signup/user-signup.component";
import { UserRoutingModule } from "./user-routing.module";
import { SharedModule } from "../Shared-Module/shared.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BusyInterceptor } from "../Shared-Module/Interceptors/busy.interceptor";

@NgModule({
  declarations: [
    UserLoginComponent,
    UserSignupComponent,
  ],
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,
    UserRoutingModule,
    SharedModule
],
  providers: [
    // provideClientHydration(),
  //  { provide: HTTP_INTERCEPTORS, useClass: BusyInterceptor, multi: true },
    // provideHttpClient(),
    // NotificationService,SharedService,SharedEndPointService
  ],
  // bootstrap: [AppComponent]
})
export class UserModule { }
