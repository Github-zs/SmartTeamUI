import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {DashboardManagementRoutingModule} from './dashboard-management-routing.module';
import {DashboardManagementComponent} from './dashboard-management.component';
import { InfoPopPageComponent } from './info-pop-page/info-pop-page.component';
import {NbPopoverModule} from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    NbPopoverModule,
    DashboardManagementRoutingModule,
  ],
  declarations: [DashboardManagementComponent, InfoPopPageComponent],
  entryComponents: [InfoPopPageComponent],
})
export class DashboardManagementModule {

}
