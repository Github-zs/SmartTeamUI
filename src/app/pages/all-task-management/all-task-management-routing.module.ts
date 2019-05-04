import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllTaskManagementComponent} from './all-task-management.component';
import {AddTaskPageComponent} from './add-task-page/add-task-page.component';

const routes: Routes = [
  {
    path: '',
    component: AllTaskManagementComponent,
    children: [
      {
        path: 'all-task-page',
        loadChildren: './all-task-page/all-task-page.module#AllTaskPageModule',
      },
      {
        path: 'add-task-page',
        component: AddTaskPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllTaskManagementRoutingModule {

}
