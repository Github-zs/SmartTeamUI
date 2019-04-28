import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TechnologyShareManagementComponent} from './technology-share-management.component';

const routes: Routes = [
  {
    path: '',
    component: TechnologyShareManagementComponent,
    children: [
      {
        path: 'technology-share-page',
        loadChildren: './technology-share-page/technology-share-page.module#TechnologySharePageModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnologyShareManagementRoutingModule {

}
