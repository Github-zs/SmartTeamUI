import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {LoginGuard} from './common/AuthGuard/loginGuard';

const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  { path: 'portal', loadChildren: 'app/portal/portal.module#PortalModule' },
  { path: '', redirectTo: '/portal/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/portal/login' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
