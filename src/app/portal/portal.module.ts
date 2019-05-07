import {NgModule} from '@angular/core';
import {ThemeModule} from '../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {PortalRoutingModule, routedComponents} from './portal-routing.module';
import {UserHttpService} from '../common/service/user-http.service';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    PortalRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    UserHttpService,
  ]
})
export class PortalModule {

}
