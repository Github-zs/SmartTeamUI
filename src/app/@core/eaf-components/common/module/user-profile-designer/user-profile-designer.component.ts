/**
 * Created Date: Tuesday, December 19th 2017, 11:04 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { Permission } from '@platform/common/constants/permissions.eum';
import { Path } from '@platform/common/constants/url.path.contant';
import { AuthGuard } from '@platform/eaf-components/common/guard/auth.guard';
import { Oauth2TokenModel } from '@platform/eaf-components/common/guard/oauth2-token.model';
import { UserModel } from '@platform/eaf-components/common/model/user-access/user.model';
import { UserProfileMainModel } from '@platform/eaf-components/common/module/user-profile-designer/model/user-profile-main.model';
import { UserProfileOption } from '@platform/eaf-components/common/module/user-profile-designer/model/user-profile-option.model';
import { UserProfileDesignerService } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-designer.service';
import { BreadCrumbsBaseHelperService } from '@platform/eaf-components/common/services/bread-crumbs-base-helper-service';
import { EventsService } from '@platform/eaf-components/common/services/events.service';
import {
    STORAGE_MODEL_HELPER_TOKEN,
    StorageModelHelperInterface
} from '@platform/eaf-components/common/services/storage-model-helper.interface';
import * as _ from 'lodash';
import { BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'user-profile-designer',
    templateUrl: 'user-profile-designer.component.html',
    styleUrls: ['user-profile-designer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserProfileDesignerComponent implements OnInit {

    @Output() save = new EventEmitter();
    @Output() close = new EventEmitter();

    private _user: UserProfileMainModel;
    private _editMode: boolean = false;
    private _isExpand: boolean = false;
    private _expandText: string = 'Expand';
    private _copyModel: any = {};
    private _designerOption: UserProfileOption;
    private _profileHasError: boolean = false;
    private _accountHasError: boolean = false;
    private _entity: any;
    private _canEdit: boolean = false;
    private _historyRouterVal: any[];
    private _fullWorkItemModel: any;
    public userCurrentPermissions = [];
    public canResetPassword: boolean;
    public canResetChallengePassword: boolean;

    get historyRouterVal(): any[] {
        return this._historyRouterVal;
    }

    set historyRouterVal(value: any[]) {
        this._historyRouterVal = value;
    }

    @Input('user')
    public set user(value: UserProfileMainModel) {
        this._user = value;
    }

    public get copyModel(): any {
        return this._copyModel;
    }

    public set copyModel(value: any) {
        this._copyModel = value;
    }

    public get user(): UserProfileMainModel {
        return this._user;
    }

    public get isExpand(): boolean {
        return this._isExpand;
    }

    public set isExpand(value: boolean) {
        this._isExpand = value;
    }

    public get expandText(): string {
        return this._expandText;
    }

    public set expandText(value: string) {
        this._expandText = value;
    }

    public get designerOption(): UserProfileOption {
        return this._designerOption;
    }

    @Input('option')
    public set designerOption(value: UserProfileOption) {
        this._designerOption = value;
    }

    public get editMode(): boolean {
        return this._editMode;
    }

    public set editMode(value: boolean) {
        this._editMode = value;
    }

    public get profileHasError(): boolean {
        return this._profileHasError;
    }

    public set profileHasError(value: boolean) {
        this._profileHasError = value;
    }

    public get accountHasError(): boolean {
        return this._accountHasError;
    }

    public set accountHasError(value: boolean) {
        this._accountHasError = value;
    }

    public get entity(): any {
        return this._entity;
    }

    public set entity(value: any) {
        this._entity = value;
    }

    public get canEdit(): boolean {
        return this._canEdit;
    }

    public set canEdit(value: boolean) {
        this._canEdit = value;
    }

    public get fullWorkItemModel(): any {
        return this._fullWorkItemModel;
    }

    @Input('fullWorkItemModel')
    public set fullWorkItemModel(value: any) {
        this._fullWorkItemModel = value;
    }

    constructor(
        protected modalService: BsModalService,
        protected eventsService: EventsService,
        protected userProfileDesignerService: UserProfileDesignerService,
        protected router: Router,
        protected toastrService: ToastrService,
        protected changeDetector: ChangeDetectorRef,
        @Inject('AuthGuard') protected authGuard: AuthGuard<UserModel, Oauth2TokenModel>,
        protected breadCrumbsBaseHelper: BreadCrumbsBaseHelperService,
        protected _translateService: TranslateService,
        @Inject(STORAGE_MODEL_HELPER_TOKEN)
        private storageHelperService: StorageModelHelperInterface
    ) {
        this._translateService.getTranslation('en').subscribe(language => {
            this._translateService.setTranslation('en', language);
            this._translateService.use('en');
        })
    }

    /**
     * Change expand status for user detail tab
     *
     * @param {boolean} isExpand
     * @memberof UserProfileDesignerComponent
     */
    onExpand(isExpand: boolean): void {
        if (isExpand) {
            this.expandText = 'Collapse';
        } else {
            this.expandText = 'Expand';
        }
        this.isExpand = isExpand;
    }

    ngOnInit(): void {
        // backup data for reverting
        this.copyModel = _.cloneDeep(this.user);
        this.editMode = this.designerOption.canEdit;
        if (this.breadCrumbsBaseHelper.commonRouterMap && this.breadCrumbsBaseHelper.commonRouterMap.get(Path.USER_PROFILE_HISTORY_PATH)) {
            this.historyRouterVal = this.breadCrumbsBaseHelper.commonRouterMap.get(Path.USER_PROFILE_HISTORY_PATH);
        } else {
            this.historyRouterVal = [];
        }
        this.userCurrentPermissions = _.map(this.authGuard.getCurrentUser().permissionList, 'permissionName');
        if (_.includes(this.userCurrentPermissions, Permission.PERSIST_OTHER_USER_ACCOUNT) || _.includes(this.userCurrentPermissions, Permission.ALL_PERMISSION)) {
            this.canEdit = true;
        }
        this.entity = this.userProfileDesignerService.constructUserProfile(this.user);
        this.canResetPassword = this.user.userId === this.storageHelperService.getItem('user')['userId'];
        this.canResetChallengePassword = this.canResetPassword || _.includes(this.userCurrentPermissions, Permission.ADMIN_RESET_CHALLENGE_ANSWERS ) || _.includes(this.userCurrentPermissions, Permission.ALL_PERMISSION);
    }


    /**
     * On Save, prepare workflow instance object and do output
     *
     * @memberof UserProfileDesignerComponent
     */
    onSave(): void {
        const user = _.cloneDeep(this.user);
        const entity = _.cloneDeep(this.entity);
        this.userProfileDesignerService.mixEntityInfoBackToUser(user, entity);
        const errorMsg = this.userProfileDesignerService.validateUserEmail(user);
        if (errorMsg) {
            this.toastrService.clear();
            this.toastrService.error(errorMsg, 'Error');
        } else {
            this.fullWorkItemModel = this.userProfileDesignerService.createUserWorkItemModel(user, this.fullWorkItemModel);
            if (this.fullWorkItemModel) {
                // set original model(in add mode, this attribute should be removed)
                if (!this.fullWorkItemModel.originalModel) {
                    this.fullWorkItemModel.originalModel = this.copyModel;
                }
                this.save.emit({
                    fullWorkItemModel: this.fullWorkItemModel
                });
                this.changeDetector.detectChanges();
            }
        }
    }

    /**
     * go view history
     *
     * @memberof UserProfileDesignerComponent
     */
    viewHistory() {
        let userId;
        if (this.user && this.user.userId) {
            userId = this.user.userId;
        }

        this.router.navigate(this.historyRouterVal, {
            queryParams: {
                userId: userId,
                // TODO: Not Fixed
                userDetailId: this.user.userDetailModel.userDetailId
            }
        });
    }

    /**
     * onClose event, if in edit, exit edit, if not, do page redirect
     *
     * @param {any} $event
     * @memberof UserProfileDesignerComponent
     */
    onClose($event): void {
        if ($event) {
            if (this.editMode) {
                this.editMode = false;
                this.user = _.cloneDeep(this.copyModel);
                this.entity = this.userProfileDesignerService.constructUserProfile(this.user);
            } else {
                this.close.emit();
            }
        }
    }

    /**
     * has detail error
     *
     * @param {any} $event
     * @memberof UserProfileDesignerComponent
     */
    hasDetailError($event) {
        if (typeof($event.profileHasError) !== 'undefined' && this.profileHasError !== $event.profileHasError) {
            this.profileHasError = $event.profileHasError;
            this.changeDetector.detectChanges();
        }
    }

    /**
     * has account error
     *
     * @param {any} $event
     * @memberof UserProfileDesignerComponent
     */
    hasAccountError($event) {
        if (typeof($event.accountHasError) !== 'undefined') {
            this.accountHasError = $event.accountHasError;
        }
    }
}
