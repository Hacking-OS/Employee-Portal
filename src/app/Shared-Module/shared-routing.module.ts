import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './Components/listing/listing.component';
import { UserExistsGuard } from './Guards/user-exist.guard';
import { HomeComponent } from './Components/home/home.component';


const routes: Routes = [
  // Redirect the base path to /page/home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'listing', component: ListingComponent, canActivate: [UserExistsGuard] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
