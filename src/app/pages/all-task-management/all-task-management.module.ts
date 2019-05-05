import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {AllTaskManagementRoutingModule} from './all-task-management-routing.module';
import {AllTaskManagementComponent} from './all-task-management.component';
import { AddTaskPageComponent } from './add-task-page/add-task-page.component';
import {EditorsModule} from '../../common/component/editors/editors.module';
import {NbSelectModule} from '@nebular/theme';
import { TaskDetailPageComponent } from './task-detail-page/task-detail-page.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    AllTaskManagementRoutingModule,
    EditorsModule,
    NbSelectModule,
  ],
  declarations: [AllTaskManagementComponent, AddTaskPageComponent, TaskDetailPageComponent],
})
export class AllTaskManagementModule {

}
