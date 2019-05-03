/**
 * Created Date: Sunday, November 26th 2017, 11:14 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Component, Inject, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { KSCBreadCrumbsModel } from '@platform/basic-components/ksc-bread-crumbs/ksc-bread-crumbs.model';
import { Ng4LoadingSpinnerService } from '@platform/basic-components/ng4-loading-spinner/ng4LoadingSpinner.service';
import { Permission } from '@platform/common/constants/permissions.eum';
import { Path } from '@platform/common/constants/url.path.contant';
import { BreadCrumbsBaseComponent } from '@platform/eaf-components/common/components/bread-crumbs-base';
import { ConfirmModalComponent } from '@platform/eaf-components/common/components/confirm-modal/confirm-modal.component';
import { GroupMembersComponent } from '@platform/eaf-components/common/components/group-management/components/group-members-component/group-members.component';
import { AuthGuard } from '@platform/eaf-components/common/guard/auth.guard';
import { Oauth2TokenModel } from '@platform/eaf-components/common/guard/oauth2-token.model';
import { PermissionModel } from '@platform/eaf-components/common/model/common/permission.model';
import { UserModel } from '@platform/eaf-components/common/model/user-access/user.model';
import { BreadCrumbsBaseHelperService } from '@platform/eaf-components/common/services/bread-crumbs-base-helper-service';
import { GroupService } from '@platform/eaf-components/common/services/http/group-http.service';
import { PermissionGuardService } from '@platform/eaf-components/common/services/permission-guard.service';
import { ReferenceAsyncCacheService } from '@platform/eaf-components/common/services/reference-async-cache.service';
import {
    STORAGE_MODEL_HELPER_TOKEN,
    StorageModelHelperInterface
} from '@platform/eaf-components/common/services/storage-model-helper.interface';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { BsModalRef, TabsetComponent } from 'ngx-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'group-management',
    templateUrl: './group-management.component.html',
    styleUrls: ['../../styles/administration/workflow-management.component.scss', './group-management.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GroupManagementComponent extends BreadCrumbsBaseComponent implements OnInit {
    @ViewChild('groupManagementTabs') groupManagementTabs: TabsetComponent;
    @ViewChild('groupMembersComponent')
    groupMembersComponent: GroupMembersComponent;
    // all the permission list
    Permission = Permission;
    // filter input text model
    public filterText: string;
    // bread crumb data model
    public breadCrumbData: Array<KSCBreadCrumbsModel>;
    // datatable settings
    public dtOptions: DataTables.Settings;
    // datatable data driven model
    public tableData;
    // datatable trigger
    public dtTrigger: Subject<any> = new Subject();
    // current group
    public selectedGroup: any;
    // ori group
    public oriGroup: any;
    // current tab
    public currentTab: string = 'details';
    // active group flag
    private isActiveFlag: boolean;
    // active user list in group
    private oriUserList: any;
    // have persist group permission
    public canPersist: boolean = false;
    public canSupervise: boolean = false;

    errorMessage: string = null;
    public currentInitPage = 0;
    @ViewChild(DataTableDirective)
    public dtElement: DataTableDirective;

    // add new group modal config.
    public config = {
        animated: true,
        keyboard: false,
        backdrop: true,
        ignoreBackdropClick: true
    };

    /*
     * Creates an instance of GroupManagementComponent.
     */
    constructor(
        @Inject('GroupService')
        private groupService: GroupService,
        private modalService: BsModalService,
        private toastrService: ToastrService,
        private vRef: ViewContainerRef,
        @Inject('ReferenceAsyncCacheService') private referenceAsyncCacheService: ReferenceAsyncCacheService,
        private permissionGuardService: PermissionGuardService,
        public router: Router,
        private spinnerService: Ng4LoadingSpinnerService,
        private _translateService: TranslateService,
        private breadCrumbsBaseHelper: BreadCrumbsBaseHelperService,
        @Inject('AuthGuard') private authGuard: AuthGuard<UserModel, Oauth2TokenModel>,
        @Inject(STORAGE_MODEL_HELPER_TOKEN)
        private storageHelperService: StorageModelHelperInterface
    ) {
        super(router);
    }

    /**
     * load data function
     *
     * @memberof WorkflowManagementComponent
     */
    loadAllGroups() {
        this.spinnerService.show();
        this.groupService.getAllGroups('true').toPromise().then(res => {
            setTimeout(_ => {this.spinnerService.hide(); });
            if (this.dtElement && this.dtElement.dtInstance) {
                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    // set current page for re-draw the data table.
                    this.currentInitPage = dtInstance.page();
                    // Destroy the table first
                    dtInstance.destroy();
                    // Call the dtTrigger to rerender again
                    this.tableData = res;
                    this.dtTrigger.next();
                });
            } else {
                this.tableData = res;
                this.dtTrigger.next();
            }
        });
    }

    ngOnInit() {
        // init bread crumb data
        if (this.breadCrumbsBaseHelper.routerMap && this.breadCrumbsBaseHelper.routerMap.get(Path.GROUP_MANAGEMENT_BREAD_CRUMB)) {
            this.breadCrumbData = this.breadCrumbsBaseHelper.routerMap.get(Path.GROUP_MANAGEMENT_BREAD_CRUMB);
        } else {
            this.breadCrumbData = [];
        }
        // init bread crumb data
        const that = this;
        // init dataTable settings
        this.dtOptions = {
            retrieve: true,
            searching: true,
            language: { search: '' },
            ordering: false,
            paging: true,
            pageLength: 10,
            lengthChange: false,
            info: false,
            initComplete: function(settings, json) {
                that.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    if (that.selectedGroup) {
                        that.tableData.forEach(((group, index) => {
                            if (_.isEqual(group['groupName'], that.selectedGroup['groupName'])) {
                                dtInstance.page(_.floor(index / 10)).draw('page');
                            }
                        }))
                    }else {
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

        const permissionModel: PermissionModel = new PermissionModel();
        permissionModel.permissionName = Permission.PERSIST_GROUP;
        if (this.permissionGuardService.hasPermission(permissionModel)) {
            this.canPersist = true;
        }

        permissionModel.permissionName = Permission.GROUP_SUPERVISOR;
        if (this.permissionGuardService.hasPermission(permissionModel)) {
            this.canSupervise = true;
        }

        // load all of workflow definitions
        this.loadAllGroups();
    }

    compareGroup(lastModel: any, oriModel: any) {
        if (!_.isEqual(lastModel.count, oriModel.count)) {
                return false;
        }
        if (!_.isEqual(lastModel.groupDesc, oriModel.groupDesc)) {
                return false;
        }
        if (!_.isEqual(lastModel.groupId, oriModel.groupId)) {
                return false;
        }
        if (!_.isEqual(lastModel.groupName, oriModel.groupName)) {
                return false;
        }
        if (!_.isEqual(lastModel.isActive, oriModel.isActive)) {
                return false;
        }
        if (!_.isEqual(lastModel.mainTransactionId, oriModel.mainTransactionId)) {
                return false;
        }
        if (!_.isEqual(lastModel.permissionList, oriModel.permissionList)) {
                return false;
        }
        if (!_.isEqual(_.sortedIndex(lastModel.roleList, 'roleId'), _.sortedIndex(oriModel.roleList, 'roleId'))) {
            return false;
        }
        if (!_.isEqual(lastModel.transactionId, oriModel.transactionId)) {
                return false;
        }
        if (!_.isEqual(lastModel.userList, oriModel.userList)) {
            return false;
        }
        return true;
    }

    /**
     * select a group from list
     * @param group
     * @returns {boolean}
     */
    selectGroup(group) {
        if (group && this.selectedGroup && group.groupId === this.selectedGroup.groupId) {
            return false;
        }
        if (this.oriGroup != null && !this.compareGroup(this.selectedGroup, this.oriGroup)) {
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
                    this.selectedGroup = group;
                    this.currentTab = 'details';
                    // refreshAll();
                    if (this.groupManagementTabs && this.groupManagementTabs.tabs) {
                        this.groupManagementTabs.tabs[0].active = true;
                    }
                    this.getGroupInfo(group.groupId);
                }
            });
        } else {
            this.selectedGroup = group;
            this.currentTab = 'details';
            // refreshAll();
            if (this.groupManagementTabs && this.groupManagementTabs.tabs) {
                this.groupManagementTabs.tabs[0].active = true;
            }
            this.getGroupInfo(group.groupId);
        }
    }

    /**
     * render account status name
     * @param value
     * @returns {string}
     */
    resetAccountStatusName() {
        if (_.isArray(this.selectedGroup.userList)) {
            this.selectedGroup.userList.forEach(function (user) {
                user.accountStatusName = 'Inactive';
                if (user.isActive) {
                    user.accountStatusName = 'Active';
                }
            })
        }
    };

    /**
     * add new group
     */
    addGroup() {
        this.selectedGroup = false;
        this.currentTab = 'details';
        this.selectedGroup = {
            groupName: '',
            isActive: true,
            roleList: [],
            permissionList: [],
            userList: []
        };
        if (this.groupManagementTabs && this.groupManagementTabs.tabs) {
            this.groupManagementTabs.tabs[0].active = true;
        }
    }

    /**
     * cancel operation
     */
    cancel() {
        this.selectedGroup = null;
        this.oriGroup = null
    };

    /**
     * save group
     */
    save() {
        if (this.isActiveFlag && this.selectedGroup.groupId) {
            if (this.selectedGroup.isActive) {
                // add a validation that prevents user from being removed from group when they has assigned group task
                const notContainUser: Array<any> = [];
                if (_.isArray(this.oriUserList)) {
                    this.oriUserList.forEach(oriUser => {
                        if (!_.find(this.selectedGroup.userList, {'userId': oriUser.userId})) {
                            notContainUser.push(oriUser);
                        }
                    })
                }
                if (notContainUser.length > 0) {
                    const param: any = {};
                    param.groupId = this.selectedGroup.groupId;
                    param.userList = notContainUser;
                    this.groupService.validateInactiveUserList(param).subscribe(
                        res => {
                            if (res === '0') {
                                this.persistGroup();
                            } else {
                                this.toastrService.error(this._translateService.instant('NOT_DEACTIVATED_OR_REMOVED'));
                            }
                        }
                    );
                } else {
                    this.persistGroup();
                }
            } else {
                this.groupService.checkGroup(this.selectedGroup.groupId).subscribe(
                    (res: any) => {
                        if (res === '0') {
                            this.persistGroup();
                        } else {
                            this.toastrService.error(this._translateService.instant('REMOVE_GROUP_ERROR'));
                        }
                    }
                )
            }
        } else {
            this.persistGroup();
        }
    }

    /**
     * persist group
     */
    persistGroup() {
        this.spinnerService.show();
        // group id need be passed in url, so set default value
        let id = -1;
        if (this.selectedGroup.groupId) {
            id = this.selectedGroup.groupId;
        }
        const group = _.cloneDeep(this.selectedGroup);
        if (_.isArray(group.userList)) {
            group.userList.forEach(function (user) {
                delete user.accountStatusName;
            })
        }
        if (_.isArray(group.roleList)) {
            group.roleList.forEach(function (role) {
                delete role.locationName;
            })
        }
        this.groupService.persistFullGroup(group, id).subscribe(res => {
            this.toastrService.success(this._translateService.instant('SAVE_GROUP_SUCCESS'));
            this.loadAllGroups();
            const currentUser = this.storageHelperService.getItem('user');
            this.authGuard.getUser(currentUser.username);
            const newGroup: any = res;
            const id = newGroup.groupId;
            this.getGroupInfo(id);
            setTimeout(_ => {this.spinnerService.hide(); });
        }, (e) => {
            setTimeout(_ => {this.spinnerService.hide(); });
            if (e.error) {
                this.toastrService.error(e.error.errorMessage);
            }
        });
    }

    /**
     * get group by id
     */
    getGroupInfo(id) {
        this.spinnerService.show();
        this.groupService.getFullGroupById(id).subscribe(data => {
            this.selectedGroup = data;
            this.isActiveFlag = this.selectedGroup.isActive;
            // get original user list in group
            this.oriUserList = _.cloneDeep(this.selectedGroup.userList);
            this.resetAccountStatusName();
            this.renderRoleLocation();
            this.oriGroup = _.cloneDeep(this.selectedGroup);
            setTimeout(_ => {this.spinnerService.hide(); });
        }, (err) => {
            this.oriGroup = _.cloneDeep(this.selectedGroup);
            setTimeout(_ => {this.spinnerService.hide(); });
        });
    }

    /**
     * render location name
     * @param code
     */
    renderRoleLocation() {
        if (_.isArray(this.selectedGroup.roleList)) {
            this.selectedGroup.roleList.forEach( (role) => {
                if (role.locationTypeCode) {
                    this.referenceAsyncCacheService.getDataByKey('LOCATION_HIERARCHY').then(reference => {
                        const object = _.find(reference, {'id': role.locationTypeCode});
                        if (object) {
                            role.locationName = ', ' + object['displayKey'];
                        }
                    })

                }
            })
        }
    }

    selectTab() {
        // this.roleManagementTabs.tabs[tab_id].active = true;
        Observable.timer().subscribe(i => {
            this.groupMembersComponent.dtElement.dtInstance.then(
                (dtInstance: DataTables.Api) => {
                    dtInstance.draw();
                }
            );
        });
    }

}
