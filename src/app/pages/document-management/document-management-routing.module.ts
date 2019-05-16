import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocumentManagementComponent} from './document-management.component';
import {DesignManagementComponent} from './design-management/design-management.component';
import {RequirementManagementComponent} from './requirement-management/requirement-management.component';
import {AddDesignPageComponent} from './design-management/add-design-page/add-design-page.component';
import {
  AddRequirementPageComponent,
} from './requirement-management/add-requirement-page/add-requirement-page.component';
import {DesignDetailPageComponent} from './design-management/design-detail-page/design-detail-page.component';
import {
  RequirementDetailPageComponent,
} from './requirement-management/requirement-detail-page/requirement-detail-page.component';
import {EditDesignPageComponent} from './design-management/edit-design-page/edit-design-page.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentManagementComponent,
    children: [
      {
        path: 'design-management',
        component: DesignManagementComponent,
      },
      {
        path: 'requirement-management',
        component: RequirementManagementComponent,
      },
      {
        path: 'add-design-page',
        component: AddDesignPageComponent,
      },
      {
        path: 'add-requirement-page',
        component: AddRequirementPageComponent,
      },
      {
        path: 'design-detail-page',
        component: DesignDetailPageComponent,
      },
      {
        path: 'requirement-detail-page',
        component: RequirementDetailPageComponent,
      },
      {
        path: 'edit-design-page',
        component: EditDesignPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentManagementRoutingModule {

}
