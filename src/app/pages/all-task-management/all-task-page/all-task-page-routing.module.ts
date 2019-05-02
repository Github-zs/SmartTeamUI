import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllTaskPageComponent} from './all-task-page.component';

const routes: Routes = [
  {
    path: '',
    component: AllTaskPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllTaskPageRoutingModule {

}
