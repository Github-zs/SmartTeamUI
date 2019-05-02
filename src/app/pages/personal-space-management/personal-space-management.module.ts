import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {PersonalSpaceManagementRoutingModule} from './personal-space-management-routing.module';
import {PersonalSpaceManagementComponent} from './personal-space-management.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    PersonalSpaceManagementRoutingModule,
  ],
  declarations: [PersonalSpaceManagementComponent],
})
export class PersonalSpaceManagementModule {

}
