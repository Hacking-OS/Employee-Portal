import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'page/Home', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('./User-Module/user.module').then(m => m.UserModule) },
  { path: 'page', loadChildren: () => import('./Shared-Module/shared.module').then(m => m.SharedModule) },
  { path: '**', redirectTo: 'page/Home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
