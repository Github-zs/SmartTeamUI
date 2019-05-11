import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {ResetPasswordPageRoutingModule} from './reset-password-page-routing.module';
import {ResetPasswordPageComponent} from './reset-password-page.component';
import {NbCardModule, NbInputModule} from '@nebular/theme';
import {UserHttpService} from '../../../common/service/user-http.service';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    NbInputModule,
    ResetPasswordPageRoutingModule,
  ],
  declarations: [ResetPasswordPageComponent],
  providers: [UserHttpService],
})
export class ResetPasswordPageModule {

}
