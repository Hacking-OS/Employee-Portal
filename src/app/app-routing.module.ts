import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'page/home', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('./User-Module/user.module').then(m => m.UserModule) },
  { path: 'page', loadChildren: () => import('./Shared-Module/shared.module').then(m => m.SharedModule) },
  { path: 'manage', loadChildren: () => import('./Management-Module/management.module').then(m => m.ManagementModule) },
  { path: '**', redirectTo: 'page/home' },
  // { path: '', redirectTo: '/(baseRouter:page/home)', pathMatch: 'full' }, // ✅ Redirect to home
  // { path: 'user', loadChildren: () => import('./User-Module/user.module').then(m => m.UserModule), outlet: 'userRouter' },
  // { path: 'page', loadChildren: () => import('./Shared-Module/shared.module').then(m => m.SharedModule), outlet: 'baseRouter' },
  // { path: 'manage', loadChildren: () => import('./Management-Module/management.module').then(m => m.ManagementModule), outlet: 'departmentRouter' },
  // { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
