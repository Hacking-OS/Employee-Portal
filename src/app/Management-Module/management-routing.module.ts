import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { UserExistsGuard } from '../Shared-Module/Guards/user-exist.guard';
import { DepartmentListingComponent } from './department-listing/department-listing.component';
import { AddComponent } from './Employees/add/add.component';
import { UpdateComponent } from './Employees/update/update.component';

const routes: Routes = [
  { path: 'department', component: DepartmentComponent , canActivate:[UserExistsGuard] },
  { path: 'departmentlisting', component: DepartmentListingComponent , canActivate:[UserExistsGuard] },
  { path: 'addEmployee', component: AddComponent , canActivate:[UserExistsGuard] },
  { path: 'updateEmployee', component: UpdateComponent , canActivate:[UserExistsGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
