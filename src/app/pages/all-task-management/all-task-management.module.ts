import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {AllTaskManagementRoutingModule} from './all-task-management-routing.module';
import {AllTaskManagementComponent} from './all-task-management.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    AllTaskManagementRoutingModule,
  ],
  declarations: [AllTaskManagementComponent],
})
export class AllTaskManagementModule {

}
