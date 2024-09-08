import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserDoesNotExistGuard } from '../Shared-Module/Guards/user-doesnot-exist.guard';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent , canActivate:[UserDoesNotExistGuard] },
  { path: 'signup', component: UserSignupComponent  , canActivate:[UserDoesNotExistGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
