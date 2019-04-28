import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {ResetPasswordPageRoutingModule} from './reset-password-page-routing.module';
import {ResetPasswordPageComponent} from './reset-password-page.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ResetPasswordPageRoutingModule,
  ],
  declarations: [ResetPasswordPageComponent],
})
export class ResetPasswordPageModule {

}
