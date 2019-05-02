import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {DashboardPageRoutingModule} from './dashboard-page-routing.module';
import {DashboardPageComponent} from './dashboard-page.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    DashboardPageRoutingModule,
  ],
  declarations: [DashboardPageComponent],
})
export class DashboardPageModule {

}
