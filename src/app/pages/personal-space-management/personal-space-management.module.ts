import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {PersonalSpaceManagementRoutingModule} from './personal-space-management-routing.module';
import {PersonalSpaceManagementComponent} from './personal-space-management.component';
import { AddNotePageComponent } from './add-note-page/add-note-page.component';
import {CKEditorModule} from 'ng2-ckeditor';
import {NoteHttpService} from '../../common/service/note-http.service';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    CKEditorModule,
    PersonalSpaceManagementRoutingModule,
  ],
  declarations: [PersonalSpaceManagementComponent, AddNotePageComponent],
  providers: [NoteHttpService],
})
export class PersonalSpaceManagementModule {

}
