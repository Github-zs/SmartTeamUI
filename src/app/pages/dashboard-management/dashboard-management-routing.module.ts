import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardManagementComponent} from './dashboard-management.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardManagementComponent,
    children: [
      {
        path: 'dashboard-page',
        loadChildren: './dashboard-page/dashboard-page.module#DashboardPageModule',
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
