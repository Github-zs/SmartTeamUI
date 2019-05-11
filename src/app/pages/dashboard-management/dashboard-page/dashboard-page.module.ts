import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {DashboardPageRoutingModule} from './dashboard-page-routing.module';
import {DashboardPageComponent} from './dashboard-page.component';
import {NbCardModule} from '@nebular/theme';
import {ShareHttpService} from '../../../common/service/share-http.service';
import {DesignHttpService} from '../../../common/service/design-http.service';
import {RequirementHttpService} from '../../../common/service/requirement-http.service';
import {TaskHttpService} from '../../../common/service/task-http.service';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    DashboardPageRoutingModule,
  ],
  declarations: [DashboardPageComponent],
  providers: [
    ShareHttpService,
    DesignHttpService,
    RequirementHttpService,
    TaskHttpService,
  ],
})
export class DashboardPageModule {

}
