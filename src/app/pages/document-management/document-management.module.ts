import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {DocumentManagementRoutingModule} from './document-management-routing.module';
import {DocumentManagementComponent} from './document-management.component';
import { DesignManagementComponent } from './design-management/design-management.component';
import { RequirementManagementComponent } from './requirement-management/requirement-management.component';
import { AddDesignPageComponent } from './design-management/add-design-page/add-design-page.component';
import {CKEditorModule} from 'ng2-ckeditor';
import {
  AddRequirementPageComponent,
} from './requirement-management/add-requirement-page/add-requirement-page.component';
import {DesignHttpService} from '../../common/service/design-http.service';
import {RequirementHttpService} from '../../common/service/requirement-http.service';
import { DesignDetailPageComponent } from './design-management/design-detail-page/design-detail-page.component';
import {
  RequirementDetailPageComponent
} from './requirement-management/requirement-detail-page/requirement-detail-page.component';
import { EditDesignPageComponent } from './design-management/edit-design-page/edit-design-page.component';
import {NbInputModule} from '@nebular/theme';
import {
  EditRequirementPageComponent
} from './requirement-management/edit-requirement-page/edit-requirement-page.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    CKEditorModule,
    NbInputModule,
    DocumentManagementRoutingModule,
  ],
  declarations: [
    DocumentManagementComponent,
    DesignManagementComponent,
    RequirementManagementComponent,
    AddDesignPageComponent,
    AddRequirementPageComponent,
    DesignDetailPageComponent,
    RequirementDetailPageComponent,
    EditDesignPageComponent,
    EditRequirementPageComponent,
  ],
  providers: [DesignHttpService, RequirementHttpService],
})
export class DocumentManagementModule {

}
