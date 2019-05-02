import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {AllTaskPageRoutingModule} from './all-task-page-routing.module';
import {AllTaskPageComponent} from './all-task-page.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    AllTaskPageRoutingModule,
  ],
  declarations: [AllTaskPageComponent],
})
export class AllTaskPageModule {

}
