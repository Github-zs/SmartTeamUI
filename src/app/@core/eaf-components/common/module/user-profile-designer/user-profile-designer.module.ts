/**
 * Created Date: Tuesday, December 19th 2017, 11:04 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

// Angular Imports
import { NgModule } from '@angular/core';
// This Module's Components
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KSCAdvanceFormEditorModule } from '@platform/advance-components';
import { KSCSelectPickerModule } from '@platform/basic-components';
import { ResetPasswordModalComponent } from '@platform/common/components/reset-password-modal/reset-password-modal.component';
import { ResetChallengeQuestionsModalComponent } from '@platform/common/components/reset-question-modal/reset-challenge-questions-modal.component';
import { ConfirmModalComponent } from '@platform/eaf-components/common/components/confirm-modal/confirm-modal.component';
import { ConfirmModalModule } from '@platform/eaf-components/common/components/confirm-modal/confirm-modal.module';
import { KSCValidatorFactory } from '@platform/eaf-components/common/ksc-form-validator/ksc-validator-factory';
import { UserProfileAccountComponent } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-account/user-profile-account.component';
import { UserProfileDesignerComponent } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-designer.component';
import { UserProfileDesignerService } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-designer.service';
import { UserProfileDetailComponent } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-detail/user-profile-detail.component';
import { AddGroupModalComponent } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-group/add-group-modal.component';
import { UserProfileGroupComponent } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-group/user-profile-group.component';
import { UserProfilePictureComponent } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-picture/user-profile-picture.component';
import { UserProfilePreferenceComponent } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-preference/user-profile-preference.component';
import { AddRoleModalComponent } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-role/add-role-modal.component';
import { RoleLocationPickerModalComponent } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-role/role-location-picker-modal.component';
import { UserProfileRoleComponent } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-role/user-profile-role.component';
import { SharedPipesModule } from '@platform/eaf-components/common/pipes/shared-pipes.module';
import { GroupService } from '@platform/eaf-components/common/services/http/group-http.service';
import { UserHttpService } from '@platform/eaf-components/common/services/http/user-http.service';
import { TranslateDataloader } from '@platform/eaf-components/common/services/translate-data-loader.service';
import { ModalModule } from 'ngx-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TreeModule } from 'angular-tree-component';
import { FileUploadModule } from 'ng2-file-upload';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        KSCAdvanceFormEditorModule.forRoot(),
        ModalModule.forRoot(),
        TranslateModule.forChild({
            loader: { provide: TranslateLoader, useClass: TranslateDataloader }
        }),
        ConfirmModalModule,
        SharedPipesModule,
        TreeModule,
        FileUploadModule,
        KSCSelectPickerModule,
        BlockUIModule
    ],
    declarations: [
        UserProfileDesignerComponent,
        UserProfileDetailComponent,
        UserProfilePreferenceComponent,
        UserProfileGroupComponent,
        UserProfileAccountComponent,
        UserProfileRoleComponent,
        AddGroupModalComponent,
        AddRoleModalComponent,
        RoleLocationPickerModalComponent,
        UserProfilePictureComponent,
        ResetPasswordModalComponent,
        ResetChallengeQuestionsModalComponent
    ],
    exports: [
        UserProfileDesignerComponent,
        UserProfileDetailComponent,
        UserProfilePreferenceComponent,
        UserProfileGroupComponent,
        UserProfileAccountComponent,
        UserProfileRoleComponent,
        ResetPasswordModalComponent,
        ResetChallengeQuestionsModalComponent
    ],
    entryComponents: [
        ConfirmModalComponent,
        AddGroupModalComponent,
        AddRoleModalComponent,
        RoleLocationPickerModalComponent,
        ResetPasswordModalComponent,
        ResetChallengeQuestionsModalComponent
    ],
    providers: [
        UserProfileDesignerService,
        KSCValidatorFactory,
        GroupService,
        UserHttpService
    ]
})
export class UserProfileDesignerModule {
}
