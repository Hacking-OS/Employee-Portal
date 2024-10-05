import { CommonModule } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
// import { BrowserModule, provideClientHydration } from "@angular/platform-browser";
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "../app-routing.module";
// import { NotificationService } from "../shared-module/Components/notification/notification.AlertService";
// import { SharedEndPointService } from "../shared-module/Services/shared-end-point.service";
// import { SharedService } from "../shared-module/Services/shared.service";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserSignupComponent } from "./user-signup/user-signup.component";
import { UserRoutingModule } from "./user-routing.module";
import { SharedModule } from "../Shared-Module/shared.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    UserLoginComponent,
    UserSignupComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule
],
  providers: [
    // provideClientHydration(),
    provideHttpClient(),
    // NotificationService,SharedService,SharedEndPointService
  ],
  // bootstrap: [AppComponent]
})
export class UserModule { }
