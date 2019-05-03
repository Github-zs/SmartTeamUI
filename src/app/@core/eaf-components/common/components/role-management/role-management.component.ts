/**
 * Created Date: Saturday, December 16th 2017, 07:08:49 pm
 * Author: KSC
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */

import { Component, Inject, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { KSCBreadCrumbsModel } from '@platform/basic-components/ksc-bread-crumbs/ksc-bread-crumbs.model';
import { Ng4LoadingSpinnerService } from '@platform/basic-components/ng4-loading-spinner/ng4LoadingSpinner.service';
import { Permission } from '@platform/common/constants/permissions.eum';
import { Path } from '@platform/common/constants/url.path.contant';
import { CommonUtils } from '@platform/common/util/common-utils';
import { ConfirmModalComponent } from '@platform/eaf-components/common/components/confirm-modal/confirm-modal.component';
import { DatatableContainerBaseComponent } from '@platform/eaf-components/common/components/datatable-container-base.component';
import { RoleMembersComponentComponent } from '@platform/eaf-components/common/components/role-management/role-members-component/role-members-component.component';
import { AuthGuard } from '@platform/eaf-components/common/guard/auth.guard';
import { Oauth2TokenModel } from '@platform/eaf-components/common/guard/oauth2-token.model';
import { PermissionModel } from '@platform/eaf-components/common/model/common/permission.model';
import { UserModel } from '@platform/eaf-components/common/model/user-access/user.model';
import { BreadCrumbsBaseHelperService } from '@platform/eaf-components/common/services/bread-crumbs-base-helper-service';
import { UserHttpService } from '@platform/eaf-components/common/services/http/user-http.service';
import { PermissionGuardService } from '@platform/eaf-components/common/services/permission-guard.service';
import {
    STORAGE_MODEL_HELPER_TOKEN,
    StorageModelHelperInterface
} from '@platform/eaf-components/common/services/storage-model-helper.interface';
import { Subject } from 'rxjs/Subject';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { TabsetComponent, BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'role-management',
    templateUrl: './role-management.component.html',
    styleUrls: [
        './role-management.component.scss',
        '../../styles/administration/workflow-management.component.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class RoleManagementComponent extends DatatableContainerBaseComponent
    implements OnInit {
    @ViewChild('roleManagementTabs') roleManagementTabs: TabsetComponent;

    @ViewChild('roleMembersComponent')
    roleMembersComponentComponent: RoleMembersComponentComponent;

    @ViewChild(DataTableDirective)
    public dtElement: DataTableDirective;

    // filter input text model
    public filterText: string;
    // bread crumb data model
    public breadCrumbData: Array<KSCBreadCrumbsModel>;
    // datatable settings
    public dtOptions: DataTables.Settings;
    // datatable data driven model
    public tableData: Array<any>;
    // datatable trigger
    public dtTrigger: Subject<any> = new Subject();
    // page form model.
    public mainFormModel: FormGroup;
    // form builder
    public fb: FormBuilder = new FormBuilder();
    // all the system permissions
    public allPermissions: Array<any> = [];
    // when user picks one role or edits an exsiting role then page should be displayed.
    public displayFlag = false;
    // check the persist permission
    public canPersist = false;

    private oriRole: any;

    // a full empty role model
    public roleObj: any = {
        roleName: '',
        roleDesc: '',
        isActive: true,
        permissionList: [],
        userList: [],
        groupList: [],
        transactionId: '',
        isSystemRole: false,
        validatedTransactionId: ''
    };

    // current editing role model
    public currentRole: any = {};

    // add new role modal config.
    public config = {
        animated: true,
        keyboard: false,
        backdrop: true,
        ignoreBackdropClick: true
    };


    public currentInitPage = 0;

    constructor(
        @Inject('UserHttpService')
        private userHttpService: UserHttpService,
        private modalService: BsModalService,
        private toastrService: ToastrService,
        private vRef: ViewContainerRef,
        private permissionGuardService: PermissionGuardService,
        private router: Router,
        private spinnerService: Ng4LoadingSpinnerService,
        private _translateService: TranslateService,
        private breadCrumbsBaseHelper: BreadCrumbsBaseHelperService,
        @Inject('AuthGuard') private authGuard: AuthGuard<UserModel, Oauth2TokenModel>,
        @Inject(STORAGE_MODEL_HELPER_TOKEN)
        private storageHelperService: StorageModelHelperInterface
    ) {
        super();
    }

    onNavigate($event) {
        if (_.isEmpty($event) || CommonUtils.isValueEmpty($event.url)) {
            return;
        }
        if (_.isEmpty($event.params)) {
            this.router.navigate([$event.url]);
        } else {
            this.router.navigate([$event.url], $event.params);
        }
    }

    ngOnInit() {

        if (this.breadCrumbsBaseHelper.routerMap && this.breadCrumbsBaseHelper.routerMap.get(Path.ROLE_MANAGEMENT_BREAD_CRUMB)) {
            this.breadCrumbData = this.breadCrumbsBaseHelper.routerMap.get(Path.ROLE_MANAGEMENT_BREAD_CRUMB);
        } else {
            this.breadCrumbData = [];
        }
        const that = this;
        // init dataTable settings
        this.dtOptions = {
            searching: true,
            language: {search: ''},
            ordering: false,
            paging: true,
            pageLength: 10,
            lengthChange: false,
            info: false,
            initComplete: function (settings, json) {
                that.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    if (that.currentRole) {
                        that.tableData.forEach(((role, index) => {
                            if (_.isEqual(role['roleName'], that.currentRole['roleName'])) {
                                dtInstance.page(_.floor(index / 10)).draw('page');
                            }
                        }))
                    } else {
                        if (that.currentInitPage !== 0) {
                            dtInstance.page(that.currentInitPage).draw('page');
                            that.currentInitPage = 0;
                        }
                    }
                });
            },
            dom:
                '<"sidebar-search-input"f>rt<"bottom col-xs-12 none-horizontal-padding"<"col-xs-12 none-horizontal-padding"p>><"clear">'
        };
        this.initForm();
        this.spinnerService.show();
        this.userHttpService
            .getAllRoles('?includeInactive=true')
            .toPromise()
            .then(res => {
                setTimeout(_ => {
                    this.spinnerService.hide();
                });
                this.tableData = res;
                this.dtTrigger.next();
            });

        this.userHttpService
            .getAllPermissions()
            .toPromise()
            .then(res => {
                this.allPermissions = res;
            });

        const permissionModel: PermissionModel = new PermissionModel();
        permissionModel.permissionName = Permission.PERSIST_ROLE;
        if (!this.permissionGuardService.hasPermission(permissionModel)) {
            this.mainFormModel.disable();
            this.canPersist = false;
        } else {
            this.mainFormModel.enable();
            this.canPersist = true;
        }
    }

    // when user select one role, set the form model by the response data.
    setMainFormModel(res: any) {
        this.currentRole = res;
        this.mainFormModel.get('detailForm').setValue({
            roleName: res.roleName,
            roleDesc: res.roleDesc,
            isActive: res.isActive
        });
        // There is a conflict as a work around we can regard form controls as a property then manually get/set or clean it.
        // reset permission list
        if (
            (this.mainFormModel.get('permissionList') as FormArray).length > 0
        ) {
            while (
                0 !==
                (this.mainFormModel.get('permissionList') as FormArray).length
                ) {
                (this.mainFormModel.get(
                    'permissionList'
                ) as FormArray).removeAt(0);
            }
        }
        if (!_.isEmpty(res.permissionList)) {
            for (let i = 0; i < res.permissionList.length; i++) {
                (this.mainFormModel.get('permissionList') as FormArray).push(
                    this.iniFormArrayGroup(res.permissionList[i], 'permission')
                );
            }
        }
        // reset member list
        if ((this.mainFormModel.get('userList') as FormArray).length > 0) {
            // with removeAt() in a loop to clean a form array this solution is not working.
            // for (let i  = 0; i < (this.mainFormModel.get('userList') as FormArray).length ; i++) {
            //     (this.mainFormModel.get('userList') as FormArray).removeAt(i);
            // }
            while (
                0 !== (this.mainFormModel.get('userList') as FormArray).length
                ) {
                (this.mainFormModel.get('userList') as FormArray).removeAt(0);
            }
        }
        if (!_.isEmpty(res.userList)) {
            for (let i = 0; i < res.userList.length; i++) {
                (this.mainFormModel.get('userList') as FormArray).push(
                    this.iniFormArrayGroup(res.userList[i], 'member')
                );
            }
        }
        // reset group list
        if ((this.mainFormModel.get('groupList') as FormArray).length > 0) {
            while (
                0 !== (this.mainFormModel.get('groupList') as FormArray).length
                ) {
                (this.mainFormModel.get('groupList') as FormArray).removeAt(0);
            }
        }
        if (!_.isEmpty(res.groupList)) {
            for (let i = 0; i < res.groupList.length; i++) {
                (this.mainFormModel.get('groupList') as FormArray).push(
                    this.iniFormArrayGroup(res.groupList[i], 'group')
                );
            }
        }
        this.setDefinitionModel();
        this.oriRole = _.cloneDeep(this.currentRole);
    }

    initForm() {
        // renew the current role object.
        this.currentRole = _.cloneDeep(this.roleObj);
        this.mainFormModel = this.fb.group({
            detailForm: this.fb.group({
                roleName: [
                    this.roleObj.roleName,
                    [Validators.required, Validators.maxLength(100)]
                ],
                roleDesc: [
                    this.roleObj.roleDesc,
                    [Validators.maxLength(512)]
                ],
                isActive: [this.roleObj.isActive]
            }),
            permissionList: this.fb.array([]),
            userList: this.fb.array([]),
            groupList: this.fb.array([])
        });
    }

    /**
     * select role
     * 
     * @param role
     * @returns {boolean}
     */
    selectRole(role) {
        if (this.oriRole != null && this.oriRole.roleId === role.roleId) {
            return false;
        }
        this.setDefinitionModel();
        if (this.oriRole != null && !this.compareRole()) {
            const modalRef: BsModalRef = this.modalService.show(
                ConfirmModalComponent, this.config
            );
            setTimeout(() => {
                modalRef.content.title = this._translateService.instant('EXIT_CONFIRMATION');
                modalRef.content.content = this._translateService.instant('WORKFLOW_MANAGEMENT_QUIT_NOTIFICATION');
            });
            const modalOnHidden: Subscription = this.modalService.onHidden.subscribe((res) => {
                modalOnHidden.unsubscribe();
                if (JSON.parse(res)) {
                    this.roleManagementTabs.tabs[0].active = true;
                    this.userHttpService
                        .getFullRoleByRoleId(role.roleId)
                        .subscribe(res => {
                            this.setMainFormModel(res);
                            this.displayFlag = true;
                            setTimeout(_ => {
                                this.spinnerService.hide();
                            });
                        });
                }
            });
            // this.spinnerService.show();
            // every time user select a role, detail tab should be shown.
        } else {
            this.spinnerService.show();
            // every time user select a role, detail tab should be shown.
            this.roleManagementTabs.tabs[0].active = true;
            this.userHttpService
                .getFullRoleByRoleId(role.roleId)
                .subscribe(res => {
                    this.setMainFormModel(res);
                    this.displayFlag = true;
                    setTimeout(_ => {
                        this.spinnerService.hide();
                    });
                });
        }
    }

    /**
     * select tab
     */
    selectTab() {
        // this.roleManagementTabs.tabs[tab_id].active = true;
        Observable.timer().subscribe(i => {
            this.roleMembersComponentComponent.dtElement.dtInstance.then(
                (dtInstance: DataTables.Api) => {
                    dtInstance.draw();
                }
            );
        });
    }

    // convert element to FormGroup
    iniFormArrayGroup(item: any, type: String): FormGroup {
        let result: FormGroup;
        if (type === 'permission') {
            result = this.fb.group({
                isActive: [item.isActive],
                permissionDesc: [item.permissionDesc],
                permissionId: [item.permissionId],
                permissionName: [item.permissionName],
                transactionId: [item.transactionId]
            });
        } else if (type === 'member') {
            result = this.fb.group({
                isSupervisor: [item.isSupervisor],
                indexUpdateFlag: [item.indexUpdateFlag],
                userId: [item.userId],
                username: [item.username],
                email: [item.email],
                invitedUser: [item.invitedUser],
                isWaitingActivation: [item.isWaitingActivation],
                loginAttemptCount: [item.loginAttemptCount],
                attemptChallenge: [item.attemptChallenge],
                isLocked: [item.isLocked],
                passwordUpdatedDate: [item.passwordUpdatedDate],
                isActive: [item.isActive],
                transactionId: [item.transactionId],
                firstName: [item.firstName],
                lastName: [item.lastName],
                userFullName: [item.userFullName],
                userDetailModel: [item.userDetailModel]
            });
        } else if (type === 'group') {
            result = this.fb.group({
                locationTypeCode: [item.locationTypeCode],
                groupId: [item.groupId],
                groupName: [item.groupName],
                groupDesc: [item.groupDesc],
                isActive: [item.isActive],
                transactionId: [item.transactionId]
            });
        } else {
        }
        return result;
    }

    /**
     *  add new role
     */
    addRole() {
        this.displayFlag = true;
        this.initForm();
        this.roleManagementTabs.tabs[0].active = true;
    }

    setDefinitionModel() {
        if (this.currentRole) {
            this.currentRole.roleName = this.mainFormModel
                .get('detailForm')
                .get('roleName').value;
            this.currentRole.roleDesc = this.mainFormModel
                .get('detailForm')
                .get('roleDesc').value;
            this.currentRole.isActive = this.mainFormModel
                .get('detailForm')
                .get('isActive').value;
            this.currentRole.permissionList = (this.mainFormModel.get(
                'permissionList'
            ) as FormArray).value;
        }
    }

    save() {
        this.spinnerService.show();
        const id = this.currentRole.roleId ? this.currentRole.roleId : -1;
        this.setDefinitionModel();
        this.userHttpService
            .persistFullRole(this.currentRole, id)
            .toPromise()
            .then(
                res => {
                    // when updated successfully, reset the transactionId.
                    this.currentRole.roleId = res.roleId;
                    this.currentRole.transactionId = res.transactionId;
                    this.currentRole.validatedTransactionId = res.transactionId;
                    // get all the roles after saving role.
                    this.userHttpService
                        .getAllRoles('?includeInactive=true')
                        .toPromise()
                        .then(
                            res => {
                                setTimeout(_ => {
                                    this.spinnerService.hide();
                                });
                                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                                    // set current page for re-draw the data table.
                                    this.currentInitPage = dtInstance.page();
                                    // Destroy the table first
                                    dtInstance.destroy();
                                    // Call the dtTrigger to rerender again
                                    this.tableData = res;
                                    this.dtTrigger.next();
                                });
                                this.toastrService.success(this._translateService.instant('SAVE_ROLE_SUCCESS'));
                                const currentUser = this.storageHelperService.getItem('user');
                                this.authGuard.getUser(currentUser.username);
                            },
                            error => {
                                this.toastrService.error(
                                    error.error.errorMessage
                                );
                            }
                        );
                },
                error => {
                    setTimeout(_ => {
                        this.spinnerService.hide();
                    });
                    this.toastrService.error(
                        error.error.errorMessage
                    );
                }
            );
        this.oriRole = null;
    }

    cancel() {
        this.currentRole = null;
        this.oriRole = null;
        this.displayFlag = false;
    }

    compareRole() {
        if (!_.isEqual(this.oriRole.groupList, this.currentRole.groupList)) {
                return false;
        }
        if (!_.isEqual(this.oriRole.isActive, this.currentRole.isActive)) {
                return false;
        }
        if (!_.isEqual(this.oriRole.isSystemRole, this.currentRole.isSystemRole)) {
                return false;
        }
        if (!_.isEqual(_.sortedIndex(this.oriRole.permissionList, 'permissionId'), _.sortedIndex(this.currentRole.permissionList, 'permissionId'))) {
            return false;
        }
        if (!_.isEqual(this.oriRole.roleDesc, this.currentRole.roleDesc)) {
                return false;
        }
        if (!_.isEqual(this.oriRole.roleId, this.currentRole.roleId)) {
                return false;
        }
        if (!_.isEqual(this.oriRole.roleName, this.currentRole.roleName)) {
                return false;
        }
        if (!_.isEqual(this.oriRole.transactionId, this.currentRole.transactionId)) {
                return false;
        }
        if (!_.isEqual(this.oriRole.userList, this.currentRole.userList)) {
            return false;
        }
        if (!_.isEqual(this.oriRole.validatedTransactionId, this.currentRole.validatedTransactionId)) {
                return false;
        }
        return true;
    }
}
