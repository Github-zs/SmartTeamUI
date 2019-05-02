import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {DashboardManagementRoutingModule} from './dashboard-management-routing.module';
import {DashboardManagementComponent} from './dashboard-management.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    DashboardManagementRoutingModule,
  ],
  declarations: [DashboardManagementComponent],
})
export class DashboardManagementModule {

}
