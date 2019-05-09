import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {PortalComponent} from './portal.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {
    path: '', component: PortalComponent,
    children: [
      {path: 'login', component: LoginComponent},
      // {path: 'reset-password', component: ResetPasswordComponent},
      // {path: 'forget-password', component: ForgetPasswordComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
  ],
})
export class PortalRoutingModule {

}

export const routedComponents = [
  PortalComponent,
  LoginComponent,
  RegisterComponent,
];
