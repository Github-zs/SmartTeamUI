import {NgModule} from '@angular/core';
import {ThemeModule} from '../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {PortalRoutingModule, routedComponents} from './portal-routing.module';
import {UserHttpService} from '../common/service/user-http.service';
import {FormsModule} from '@angular/forms';
import {NbAuthModule} from '@nebular/auth';
import {NbInputModule, NbToastrModule, NbToastrService} from '@nebular/theme';
import { RegisterComponent } from './register/register.component';
import {ModalModule} from 'ngx-bootstrap';
import {config} from 'rxjs';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    PortalRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    NbAuthModule,
    NbInputModule,
    NbToastrModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    UserHttpService,
    NbToastrService,
  ],
  entryComponents: [
    RegisterComponent,
  ],
})
export class PortalModule {

}
