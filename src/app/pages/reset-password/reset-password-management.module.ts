import {NgModule} from '@angular/core';
import {ResetPasswordManagementComponent} from './reset-password-management.component';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {ResetPasswordManagementRoutingModule} from './reset-password-management-routing.module';
import {UserHttpService} from '../../common/service/user-http.service';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ResetPasswordManagementRoutingModule,
  ],
  declarations: [ResetPasswordManagementComponent],
  providers: [UserHttpService],
})
export class ResetPasswordManagementModule {

}
