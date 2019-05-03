/**
 * Created Date: Monday, December 18th 2017, 06:16:27 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { KSCSelect2Module } from '@platform/basic-components/ksc-select2/ksc-select2.module';
import { ChangeReasonEditModalComponent } from '@platform/eaf-components/common/components/change-reason-edit-modal/change-reason-edit-modal.component';
import { TranslateDataloader } from '@platform/eaf-components/common/services/translate-data-loader.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild({loader: {provide: TranslateLoader, useClass: TranslateDataloader}}),
    KSCSelect2Module
  ],
  declarations: [ChangeReasonEditModalComponent],
  exports: [ChangeReasonEditModalComponent]
})
export class ChangeReasonEditModalModule {
}
