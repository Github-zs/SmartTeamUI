/**
 * Created Date: Friday, December 15th 2017, 03:25:31 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { KSCAdvanceSearchFormModule, KSCAdvanceSearchResultModule } from '@platform/advance-components';
import { ReferenceTableHttpService } from '@platform/common/services/http/reference-table-http.service';
import { GuardModule } from '@platform/eaf-components/common/guard/guard.module';
import { UserSearchingModalComponent } from '@platform/eaf-components/common/module/user-searching/components/user-searching-modal.component';
import { UserSearchingComponent } from '@platform/eaf-components/common/module/user-searching/user-searching.component';
import { UserSearchingService } from '@platform/eaf-components/common/module/user-searching/user-searching.service';
import { UserHttpService } from '@platform/eaf-components/common/services/http/user-http.service';
import { TranslateDataloader } from '@platform/eaf-components/common/services/translate-data-loader.service';

@NgModule({
    declarations: [
        UserSearchingComponent,
        UserSearchingModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        KSCAdvanceSearchFormModule,
        KSCAdvanceSearchResultModule,
        GuardModule,
        TranslateModule.forChild({
            loader: {provide: TranslateLoader, useClass: TranslateDataloader}
        }),

    ],
    exports: [UserSearchingComponent, UserSearchingModalComponent],
    entryComponents: [
        UserSearchingModalComponent,
        UserSearchingComponent
    ],
    providers: [
        ReferenceTableHttpService,
        UserHttpService,
        UserSearchingService
    ]
})

export class UserSearchingModule {
}
