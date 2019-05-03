/**
 * Created Date: Sunday, July 16th 2017, 9:31:53 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from '@platform/eaf-components/common/module/profile-card/profile-card.component';
import { SharedPipesModule } from '@platform/eaf-components/common/pipes/shared-pipes.module';
import { AdministrationService } from '@platform/eaf-components/common/services/administration.service';

@NgModule({
    imports: [
        CommonModule,
        SharedPipesModule
    ],
    declarations: [ProfileCardComponent],
    exports: [ProfileCardComponent],
    providers: [AdministrationService]
})
export class ProfileCardModule {
}
