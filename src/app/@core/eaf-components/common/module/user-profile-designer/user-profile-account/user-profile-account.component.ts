/**
 * Created Date: Friday, December 22nd 2017, 02:09:26 pm
 * Author: KSC
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */

import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordModalComponent } from '@platform/common/components/reset-password-modal/reset-password-modal.component';
import { ResetChallengeQuestionsModalComponent } from '@platform/common/components/reset-question-modal/reset-challenge-questions-modal.component';
import { CommonConstant } from '@platform/common/constants/common.constant';
import { userNameValidator } from '@platform/eaf-components/common/form-validation/naming-rules-validator';
import { UserModel } from '@platform/eaf-components/common/model/user-access/user.model';
import { UserProfileMainModel } from '@platform/eaf-components/common/module/user-profile-designer/model/user-profile-main.model';
import { UserHttpService } from '@platform/eaf-components/common/services/http/user-http.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { Message as MESSAGE } from '@platform/common/constants/message.constant';
@Component({
    selector: 'user-profile-account',
    templateUrl: './user-profile-account.component.html',
    styleUrls: ['./user-profile-account.component.css']
})
export class UserProfileAccountComponent implements OnInit, DoCheck {
    @Output() hasError = new EventEmitter();
    @Input() userObj: UserProfileMainModel;
    @Input() isExternalUser: boolean;
    @Input() canPersistUser: boolean;
    @Input() editMode: boolean;
    @Input() showResetButtons: boolean;
    @Input() canResetPassword: boolean;
    @Input() canResetSecurityPassword: boolean;
    public accountForm: FormGroup;
    MESSAGE = MESSAGE;
    public errorMessage: string;
    public isUserActive: boolean;
    public chalengeQuestionRefList = CommonConstant.CHALENGEQUSETIONREFLIST;
    // modal config.
    public config_modal = {
        animated: true,
        keyboard: false,
        backdrop: true,
        ignoreBackdropClick: true
    };
    public resetPasswordModalComponentRef: BsModalRef;
    public resetQuestionModalComponentRef: BsModalRef;

    constructor(
        private fb: FormBuilder,
        private userHttpService: UserHttpService,
        private modalService: BsModalService
    ) {}

    ngOnInit() {
        this.isUserActive = this.isExternalUser ? true : this.userObj.isActive;
        this.buildForm();
        this.accountForm.valueChanges.subscribe(value => {
            if (this.userObj.username !== value.userName) {
                this.checkUserName(value.userName);
            }
            this.userObj.username = value.userName;
            this.userObj.isActive = value.active;
            this.userObj.isLocked = value.locked;
            this.userObj.isWaitingActivation = value.pendingActivation;
        });
        // linsten the form status change to enable/disable save button
        this.accountForm.statusChanges.subscribe(value => {
            this.hasError.emit({
                accountHasError: !this.accountForm.valid
            });
        });
        // after init form, emit the form status
        this.hasError.emit({
            accountHasError: !this.accountForm.valid
        });
    }

    // name should not be blank.
    removeBlanks(name) {
            const nameWithoutBlank = _.trim(this.accountForm.get(name).value);
            this.accountForm.controls[name].setValue(nameWithoutBlank);
    }

    // begin form build
    buildForm(): void {
        const pwdFormattedDate = this.userObj.passwordUpdatedDate
            ? moment.utc(this.userObj.passwordUpdatedDate).format('YYYY-MM-DD')
            : '';
        this.accountForm = this.fb.group({
            userName: [
                this.userObj.username ? this.userObj.username : '',
                [
                    Validators.required,
                    Validators.maxLength(50),
                    userNameValidator
                ]
            ],
            pwdLastUpdated: [pwdFormattedDate],
            active: [this.isUserActive],
            locked: [this.userObj.isLocked],
            pendingActivation: [this.userObj.isWaitingActivation]
        });
    }

    checkUserName(userName) {
        if (userName) {
            if (this.accountForm.get('userName').hasError('username')) {
                this.accountForm.get('userName').setErrors({ username: true });
                return;
            }
            if (userName.length > 200) {
                this.accountForm.get('userName').setErrors({ maxlength: true });
                return;
            } else {
                this.accountForm.get('userName').setErrors(null);
                this.userHttpService
                    .checkUserStatus(userName.toLowerCase())
                    .subscribe((res: UserModel) => {
                        if (res && res.username) {
                            this.accountForm
                                .get('userName')
                                .setErrors({ duplicated: true });
                        } else {
                            this.accountForm.get('userName').setErrors(null);
                        }
                    });
            }
        }
    }


    /**
     * Handle response error
     *
     * @private
     * @param {any} res
     * @memberof ResetPasswordComponent
     */
    private handleError(res): void {
        if (
            res.error &&
            res.error.error_description &&
            MESSAGE[res.error.error_description]
        ) {
            this.errorMessage = MESSAGE[res.error.error_description];
        } else {
            this.errorMessage = MESSAGE.DEFAULT_ERROR;
        }
    }

    ngDoCheck(): void {
        // if (this.accountForm && this.editMode) {
        //     this.hasError.emit({
        //         accountHasError: !this.accountForm.valid
        //     })
        // }
    }

    openResetPasswordModel () {
        this.resetPasswordModalComponentRef = this.modalService.show(
            ResetPasswordModalComponent, this.config_modal
        );
        const modalOnHide: Subscription = this.modalService.onHide.subscribe(
            (user: any) => {
                if (user) {
                    this.userObj.passwordUpdatedDate = JSON.parse(user)['passwordUpdatedDate'];
                    this.buildForm();
                }
                modalOnHide.unsubscribe();
            }
        );
        this.resetPasswordModalComponentRef.content.init(this.userObj);
    }

    openResetSecurityQuestionsModel() {
        this.resetQuestionModalComponentRef = this.modalService.show(
            ResetChallengeQuestionsModalComponent,this.config_modal
        );
        const modalOnHide: Subscription = this.modalService.onHide.subscribe(
            () => {
                modalOnHide.unsubscribe();
            }
        );
        this.resetQuestionModalComponentRef.content.init(this.userObj);
    }

    renderPendingActivation() {
        return this.accountForm.get('pendingActivation').value ? 'Yes' : 'No';
    }
}
