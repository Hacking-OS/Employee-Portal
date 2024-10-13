import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { UserExistsGuard } from '../Shared-Module/Guards/user-exist.guard';
import { DepartmentListingComponent } from './department-listing/department-listing.component';

const routes: Routes = [
  { path: 'department', component: DepartmentComponent , canActivate:[UserExistsGuard] },
  { path: 'departmentlisting', component: DepartmentListingComponent , canActivate:[UserExistsGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
