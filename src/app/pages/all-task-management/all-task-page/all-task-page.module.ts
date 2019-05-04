import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {AllTaskPageRoutingModule} from './all-task-page-routing.module';
import {AllTaskPageComponent} from './all-task-page.component';
import {NbListModule} from '@nebular/theme';
import {CKEditorModule} from 'ng2-ckeditor';
import {EditorsModule} from '../../../common/component/editors/editors.module';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    NbListModule,
    AllTaskPageRoutingModule,
    CKEditorModule,
    EditorsModule,
  ],
  declarations: [AllTaskPageComponent],
})
export class AllTaskPageModule {

}
