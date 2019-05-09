import {NgModule} from '@angular/core';
import {ThemeModule} from '../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {PortalRoutingModule, routedComponents} from './portal-routing.module';
import {UserHttpService} from '../common/service/user-http.service';
import {FormsModule} from '@angular/forms';
import {NbAuthModule} from '@nebular/auth';
import {NbInputModule} from '@nebular/theme';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    PortalRoutingModule,
    FormsModule,
    NbAuthModule,
    NbInputModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    UserHttpService,
  ],
  entryComponents: [
    RegisterComponent,
  ],
})
export class PortalModule {

}
