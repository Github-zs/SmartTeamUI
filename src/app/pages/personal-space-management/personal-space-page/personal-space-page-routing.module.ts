import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonalSpacePageComponent} from './personal-space-page.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalSpacePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalSpacePageRoutingModule {

}
