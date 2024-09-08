import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './Components/listing/listing.component';
import { UserExistsGuard } from './Guards/user-exist.guard';
import { HomeComponent } from './Components/home/home.component';


const routes: Routes = [
  { path: 'listing', component: ListingComponent , canActivate:[UserExistsGuard]},
  { path: 'Home', component: HomeComponent},
  // { path: 'signup', component: UserSignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
