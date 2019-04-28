import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {TechnologySharePageRoutingModule} from './technology-share-page-routing.module';
import {TechnologySharePageComponent} from './technology-share-page.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    TechnologySharePageRoutingModule,
  ],
  declarations: [TechnologySharePageComponent],
})
export class TechnologySharePageModule {

}
