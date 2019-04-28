import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TechnologySharePageComponent} from './technology-share-page.component';

const routes: Routes = [
  {
    path: '',
    component: TechnologySharePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnologySharePageRoutingModule {

}
