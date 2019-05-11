import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {TechnologyShareManagementRoutingModule} from './technology-share-management-routing.module';
import {TechnologyShareManagementComponent} from './technology-share-management.component';
import {ShareHttpService} from '../../common/service/share-http.service';
import { AddSharePageComponent } from './add-share-page/add-share-page.component';
import {CKEditorModule} from 'ng2-ckeditor';
import { ShareDetailPageComponent } from './share-detail-page/share-detail-page.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    CKEditorModule,
    TechnologyShareManagementRoutingModule,
  ],
  declarations: [TechnologyShareManagementComponent, AddSharePageComponent, ShareDetailPageComponent],
  providers: [ShareHttpService],
})
export class TechnologyShareManagementModule {

}
