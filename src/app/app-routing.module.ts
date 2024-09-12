import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { UpdatePasswordComponent } from './authentification/update-password/update-password.component';


const routes: Routes = [
  {
    path: 'realms/:realm/login-actions/required-action',
    component: UpdatePasswordComponent
  },
  {
    path: 'realms/:realm/login-actions/action-token',
    component: UpdatePasswordComponent

  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
