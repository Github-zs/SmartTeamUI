
/**
 * Created Date: Monday, December 25th 2017, 12:59 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { UserProfileMainModel } from '@platform/eaf-components/common/module/user-profile-designer/model/user-profile-main.model';
import { UserProfileDesignerService } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-designer.service';
import { AddRoleModalComponent } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-role/add-role-modal.component';
import { RoleLocationPickerModalComponent } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-role/role-location-picker-modal.component';
import { UserHttpService } from '@platform/eaf-components/common/services/http/user-http.service';
import { ReferenceAsyncCacheService } from '@platform/eaf-components/common/services/reference-async-cache.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ChangeDetectorRef, Component, Inject, Input, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
    selector: 'user-profile-role',
    templateUrl: 'user-profile-role.component.html',
    styleUrls: ['user-profile-role.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserProfileRoleComponent implements OnInit {

    @Input('user')
    public user: UserProfileMainModel;

    private _editMode: boolean = false;
    private _allRoles: any;
    private _availableRoles: any;
    private _modalRef: BsModalRef;
    private _locationArr: Array<object>;
    private _nodes: any;
    private _canPersistUser: boolean = false;
    private _roleLocationPickerModalRef: BsModalRef;
    private _canEdit: boolean = false;

    public get allRoles(): any {
        return this._allRoles;
    }

    public set allRoles(value: any) {
        this._allRoles = value;
    }

    public get availableRoles(): any {
        return this._availableRoles;
    }

    public set availableRoles(value: any) {
        this._availableRoles = value;
    }

    public get modalRef(): BsModalRef {
        return this._modalRef;
    }

    public set modalRef(value: BsModalRef) {
        this._modalRef = value;
    }

    public get editMode(): boolean  {
        return this._editMode;
    }
    @Input('editMode')
    public set editMode(value: boolean ) {
        this._editMode = value;
    }

    public get nodes(): any {
        return this._nodes;
    }

    public set nodes(value: any) {
        this._nodes = value;
    }

    public get locationArr(): Array<object> {
        return this._locationArr;
    }

    public set locationArr(value: Array<object>) {
        this._locationArr = value;
    }

    public get canPersistUser(): boolean  {
        return this._canPersistUser;
    }

    @Input('canPersistUser')
    public set canPersistUser(value: boolean ) {
        this._canPersistUser = value;
    }

    public get roleLocationPickerModalRef(): BsModalRef {
        return this._roleLocationPickerModalRef;
    }

    public set roleLocationPickerModalRef(value: BsModalRef) {
        this._roleLocationPickerModalRef = value;
    }

    public get canEdit(): boolean  {
        return this._canEdit;
    }

    @Input('canEdit')
    public set canEdit(value: boolean ) {
        this._canEdit = value;
    }

    /**
     * default config for modal
     *
     * @private
     * @memberof UserProfileRoleComponent
     */
    private config = {
        animated: true,
        keyboard: false,
        backdrop: true,
        ignoreBackdropClick: true
    };

    constructor(
        private zone: NgZone,
        private modalService: BsModalService,
        private userHttpService: UserHttpService,
        private changeDetection: ChangeDetectorRef,
        @Inject('ReferenceAsyncCacheService') private referenceAsyncCacheService: ReferenceAsyncCacheService,
        private userProfileDesignerService: UserProfileDesignerService) {
    }

    ngOnInit(): void {
        this.initAllRoles();
    }

    /**
     * init all role
     *
     * @memberof UserProfileRoleComponent
     */
    initAllRoles() {
        this.userHttpService.getAllRoles('?strIncludeInactive=true').subscribe(roles => {
            this.allRoles = roles;
            this.setFilters();
            this.userProfileDesignerService.retrieveLocationNodes().then(nodes => {
                this.nodes = nodes
            });
            this.referenceAsyncCacheService.getDataByKey('LOCATION_HIERARCHY').then(locationArr => {
                this.locationArr = locationArr;
            });
        });
    }

    /**
     * Remove role
     *
     * @param {any} removedRole
     * @memberof UserProfileRoleComponent
     */
    removeRole($event, removedRole) {
        if ($event && this.user.roleList) {
            this.user.roleList.forEach((currentRole, index) => {
                if (currentRole.roleId === removedRole.roleId) {
                    this.user.roleList.splice(index, 1);
                    return;
                }
            });
        }
    }

    /**
     * set filter based on user current selected roles
     *
     * @memberof UserProfileRoleComponent
     */
    setFilters() {
        if (!_.isEmpty(this.user.roleList)) {
            this.availableRoles = this.allRoles.filter(obj => {
                return !this.user.roleList.some(function(obj2) {
                    return obj.roleId === obj2.roleId;
                });
            });
        } else {
            this.availableRoles = this.allRoles;
        }
    }

    /**
     * Open role select dialog
     *
     * @memberof UserProfileRoleComponent
     */
    openRoleModal() {
        this.setFilters();
        const modalOnHide: Subscription = this.modalService.onHide.subscribe(selectedRoles => {
            this.zone.run(() => {
                modalOnHide.unsubscribe();
                this.closeRoleModal(JSON.parse(selectedRoles));
            });
        });
        this.roleLocationPickerModalRef = this.modalService.show(AddRoleModalComponent, this.config);
        this.roleLocationPickerModalRef.content.availableRole = this.availableRoles;
        this.roleLocationPickerModalRef.content.filteredData = this.availableRoles;
    }

    /**
     * Close role select dialog then open role location select dialog
     *
     * @param {any} selectedRoles
     * @memberof UserProfileRoleComponent
     */
    closeRoleModal(selectedRoles) {
        if (!_.isEmpty(selectedRoles)) {
            // A work around for copy array with reference binding,Object.assign not working in IE .
            const modalOnHide: Subscription =  this.modalService.onHide.subscribe(locationTypeCode => {
                modalOnHide.unsubscribe();
                if (locationTypeCode) {
                    for (let i = 0; i < selectedRoles.length; i++) {
                        selectedRoles[i].locationTypeCode = locationTypeCode;
                        if (!this.user.roleList) {
                            this.user.roleList = [];
                        }
                        this.user.roleList.push(selectedRoles[i]);
                    }
                } else {
                    // No need to perform any action since the modal just canceled
                }
                this.setFilters();
                // Force detect changes for current zone to fix issue DATAFAB-6242
                this.changeDetection.detectChanges();
            });
            this.roleLocationPickerModalRef = this.modalService.show(RoleLocationPickerModalComponent, this.config);
            this.roleLocationPickerModalRef.content.nodes = this.nodes;
        } else {
            // No need to perform any action since the modal just canceled
            this.setFilters();
        }
    }

    /**
     * getLocationNameByCode
     *
     * @param {any} code
     * @returns
     * @memberof UserProfileRoleComponent
     */
    getLocationNameByCode(code) {
        const location = _.find(this.locationArr, {'key': String(code)});
        return location ? location['displayKey'] : '';
    }
}
