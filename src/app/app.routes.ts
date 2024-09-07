import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-module/user-login/user-login.component';
import { UserSignupComponent } from './user-module/user-signup/user-signup.component';

export const routes: Routes = [
  {path: '', component:UserLoginComponent},
  {path: 'signup', component:UserSignupComponent}
];
