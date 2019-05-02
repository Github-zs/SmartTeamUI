import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonalSpaceManagementComponent} from './personal-space-management.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalSpaceManagementComponent,
    children: [
      {
        path: 'personal-space-page',
        loadChildren: './personal-space-page/personal-space-page.module#PersonalSpacePageModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalSpaceManagementRoutingModule {

}
