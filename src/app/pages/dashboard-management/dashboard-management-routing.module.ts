import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardManagementComponent} from './dashboard-management.component';
import {LoginGuard} from '../../common/AuthGuard/loginGuard';

const routes: Routes = [
  {
    path: '',
    component: DashboardManagementComponent,
    children: [
      {
        path: 'dashboard-page',
        loadChildren: './dashboard-page/dashboard-page.module#DashboardPageModule',
        canActivate: [LoginGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardManagementRoutingModule {

}
