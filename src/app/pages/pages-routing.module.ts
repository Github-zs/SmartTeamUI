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
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
