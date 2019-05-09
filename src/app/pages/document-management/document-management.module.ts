import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {DocumentManagementRoutingModule} from './document-management-routing.module';
import {DocumentManagementComponent} from './document-management.component';
import { DesignManagementComponent } from './design-management/design-management.component';
import { RequirementManagementComponent } from './requirement-management/requirement-management.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    DocumentManagementRoutingModule,
  ],
  declarations: [
    DocumentManagementComponent,
    DesignManagementComponent,
    RequirementManagementComponent,
  ],
})
export class DocumentManagementModule {

}
