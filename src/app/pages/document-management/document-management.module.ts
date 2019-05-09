import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {DocumentManagementRoutingModule} from './document-management-routing.module';
import {DocumentManagementComponent} from './document-management.component';
import { DesignManagementComponent } from './design-management/design-management.component';
import { RequirementManagementComponent } from './requirement-management/requirement-management.component';
import { AddDesignPageComponent } from './design-management/add-design-page/add-design-page.component';
import {CKEditorModule} from 'ng2-ckeditor';
import { AddRequirementPageComponent } from './requirement-management/add-requirement-page/add-requirement-page.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    CKEditorModule,
    DocumentManagementRoutingModule,
  ],
  declarations: [
    DocumentManagementComponent,
    DesignManagementComponent,
    RequirementManagementComponent,
    AddDesignPageComponent,
    AddRequirementPageComponent,
  ],
})
export class DocumentManagementModule {

}
