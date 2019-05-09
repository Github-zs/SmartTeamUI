import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'reset-password-management',
      loadChildren: './reset-password/reset-password-management.module#ResetPasswordManagementModule',
    },
    {
      path: 'technology-share-management',
      loadChildren: './technology-share-management/technology-share-management.module#TechnologyShareManagementModule',
    },
    {
      path: 'personal-space-management',
      loadChildren: './personal-space-management/personal-space-management.module#PersonalSpaceManagementModule',
    },
    {
      path: 'dashboard-management',
      loadChildren: './dashboard-management/dashboard-management.module#DashboardManagementModule',
    },
    {
      path: 'all-task-management',
      loadChildren: './all-task-management/all-task-management.module#AllTaskManagementModule',
    },
    {
      path: 'document-management',
      loadChildren: './document-management/document-management.module#DocumentManagementModule',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
