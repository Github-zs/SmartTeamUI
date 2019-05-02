import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {PersonalSpacePageRoutingModule} from './personal-space-page-routing.module';
import {PersonalSpacePageComponent} from './personal-space-page.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    PersonalSpacePageRoutingModule,
  ],
  declarations: [PersonalSpacePageComponent],
})
export class PersonalSpacePageModule {

}
