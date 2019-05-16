import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TechnologyShareManagementComponent} from './technology-share-management.component';
import {AddSharePageComponent} from './add-share-page/add-share-page.component';
import {ShareDetailPageComponent} from './share-detail-page/share-detail-page.component';
import {EditSharePageComponent} from './edit-share-page/edit-share-page.component';

const routes: Routes = [
  {
    path: '',
    component: TechnologyShareManagementComponent,
    children: [
      {
        path: 'technology-share-page',
        loadChildren: './technology-share-page/technology-share-page.module#TechnologySharePageModule',
      },
      {
        path: 'add-share-page',
        component: AddSharePageComponent,
      },
      {
        path: 'share-detail-page',
        component: ShareDetailPageComponent,
      },
      {
        path: 'edit-share-page',
        component: EditSharePageComponent,
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
