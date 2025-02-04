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
import { ManagementRoutingModule } from "./management-routing.module";
import { SharedModule } from "../Shared-Module/shared.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DepartmentComponent } from './department/department.component';
import { DepartmentListingComponent } from './department-listing/department-listing.component';
import { AddComponent } from './Employees/add/add.component';
import { UpdateComponent } from './Employees/update/update.component';
import { RemoveComponent } from './Employees/remove/remove.component';
import { BusyInterceptor } from "../Shared-Module/Interceptors/busy.interceptor";

@NgModule({
  declarations: [
    DepartmentComponent,
    DepartmentListingComponent,
    AddComponent,
    UpdateComponent,
    RemoveComponent,
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
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
    // { provide: HTTP_INTERCEPTORS, useClass: BusyInterceptor, multi: true },
    provideHttpClient(),
    // NotificationService,SharedService,SharedEndPointService
  ],
  // bootstrap: [AppComponent]
})
export class ManagementModule { }
