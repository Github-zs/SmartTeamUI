/**
 * Created Date: Monday, October 23rd 2017, 9:24:55 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ConfirmModalDirective } from '@platform/eaf-components/common/components/confirm-modal/comfirm-modal.directive';
import { ConfirmModalComponent } from '@platform/eaf-components/common/components/confirm-modal/confirm-modal.component';
import { TranslateDataloader } from '@platform/eaf-components/common/services/translate-data-loader.service';

@NgModule({
  imports: [
            CommonModule,
            TranslateModule.forChild({
              loader: {provide: TranslateLoader, useClass: TranslateDataloader}
          })
           ],
  declarations: [
    ConfirmModalComponent, ConfirmModalDirective
  ],
  exports: [ConfirmModalComponent, ConfirmModalDirective]
})
export class ConfirmModalModule { }
