import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {TechnologyShareManagementRoutingModule} from './technology-share-management-routing.module';
import {TechnologyShareManagementComponent} from './technology-share-management.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    TechnologyShareManagementRoutingModule,
  ],
  declarations: [TechnologyShareManagementComponent],
})
export class TechnologyShareManagementModule {

}
