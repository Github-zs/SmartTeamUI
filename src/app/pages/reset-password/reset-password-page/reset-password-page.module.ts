import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {ResetPasswordPageRoutingModule} from './reset-password-page-routing.module';
import {ResetPasswordPageComponent} from './reset-password-page.component';
import {NbCardModule, NbInputModule, NbToastrModule, NbToastrService} from '@nebular/theme';
import {UserHttpService} from '../../../common/service/user-http.service';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbToastrModule.forRoot(),
    ResetPasswordPageRoutingModule,
  ],
  declarations: [ResetPasswordPageComponent],
  providers: [
    UserHttpService,
    NbToastrService,
  ],
})
export class ResetPasswordPageModule {

}
