import {NgModule} from '@angular/core';
import {ResetPasswordManagementComponent} from './reset-password-management.component';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {ResetPasswordManagementRoutingModule} from './reset-password-management-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ResetPasswordManagementRoutingModule,
  ],
  declarations: [ResetPasswordManagementComponent],
})
export class ResetPasswordManagementModule {

}
