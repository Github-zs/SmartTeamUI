/**
 * Created Date: Saturday, December 16th 2017, 07:08:49 pm
 * Author: KSC
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */

import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AddPermissionModalComponent } from '@platform/eaf-components/common/components/role-management/role-permissions-component/add-permission-modal.component';
import { RemovePermissionModalComponent } from '@platform/eaf-components/common/components/role-management/role-permissions-component/remove-permission-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'role-permissions-component',
    templateUrl: './role-permissions-component.component.html',
    styleUrls: [
        './role-permissions-component.component.scss',
        '../role-management.component.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class RolePermissionsComponentComponent {
    @Input() public permissionList: FormArray;
    @Input() public allPermissions: Array<any> = [];
    @Input() public canPersist: boolean = false;

    // temp array for filters
    public availablePermissions: Array<any>;
    // permission modal config.
    public config = {
        animated: true,
        keyboard: false,
        backdrop: true,
        ignoreBackdropClick: true
    };
    permissionModalRef: BsModalRef;

    // form builder
    public fb: FormBuilder = new FormBuilder();

    constructor(private modalService: BsModalService) {}


    setFilters() {
        if (!_.isEmpty(this.permissionList.value)) {
            this.availablePermissions = this.allPermissions.filter(obj => {
                return !this.permissionList.value.some(function(obj2) {
                    return obj.permissionId === obj2.permissionId;
                });
            });
        } else {
            this.availablePermissions = this.allPermissions;
        }
    }

    openAddPermissionModal() {
        this.setFilters();
        const modalOnHide: Subscription = this.modalService.onHide.subscribe(selectedPermissions => {
            const tempPermissionList = JSON.parse(selectedPermissions);
            modalOnHide.unsubscribe();
            if (!_.isEmpty(tempPermissionList)) {
                for (let i = 0; i < tempPermissionList.length; i++) {
                    this.permissionList.push(this.setPermissionFormArray(tempPermissionList[i]));
                }
            }
        });
        this.permissionModalRef = this.modalService.show(AddPermissionModalComponent, this.config);
        this.permissionModalRef.content.availablePermissions = this.availablePermissions;
        this.permissionModalRef.content.filteredData = this.availablePermissions;
    }

    openRemovePermissionModal(selectedPermission) {
        if (this.canPersist) {
            const modalOnHide: Subscription = this.modalService.onHide.subscribe(selectedPermission => {
                const tempPermission = JSON.parse(selectedPermission);
                modalOnHide.unsubscribe();
                if (tempPermission != null) {
                    for (let i = 0; i < this.permissionList.length; i++) {
                        if (this.permissionList.controls[i].get('permissionId').value === tempPermission.permissionId) {
                            this.permissionList.removeAt(i);
                            break;
                        }
                    }
                } else {
                }
                this.setFilters();
            });
            this.permissionModalRef = this.modalService.show(RemovePermissionModalComponent, this.config);
            this.permissionModalRef.content.selectedPermission = selectedPermission;
        }
    }

    setPermissionFormArray (permissionObj): FormGroup {
        let result: FormGroup;
        result = this.fb.group({
            isActive: [permissionObj.isActive],
            permissionDesc: [permissionObj.permissionDesc],
            permissionId: [permissionObj.permissionId],
            permissionName: [permissionObj.permissionName],
            transactionId: [permissionObj.transactionId]
        });
        return result;
    }
}
