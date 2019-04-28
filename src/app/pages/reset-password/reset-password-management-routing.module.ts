import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResetPasswordManagementComponent} from './reset-password-management.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordManagementComponent,
    children: [
      {
        path: 'reset-password',
        loadChildren: './reset-password-page/reset-password-page.module#ResetPasswordPageModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordManagementRoutingModule {

}
