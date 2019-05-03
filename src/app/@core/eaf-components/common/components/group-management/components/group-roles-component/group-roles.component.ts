/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Component, OnInit, Input, Inject, } from '@angular/core';
import { AddLocationModalComponent } from '@platform/eaf-components/common/components/group-management/components/add-location-modal.component';
import { AddRoleModalComponent } from '@platform/eaf-components/common/components/group-management/components/add-role-modal.component';
import { RemoveRoleConfirmModalComponent } from '@platform/eaf-components/common/components/group-management/components/remove-role-confirm-modal.component';
import { GroupService } from '@platform/eaf-components/common/services/http/group-http.service';
import { ReferenceAsyncCacheService } from '@platform/eaf-components/common/services/reference-async-cache.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import {Subscription} from 'rxjs/Subscription';
import * as lodash from 'lodash';

@Component({
    selector: 'group-roles-component',
    styleUrls: [],
    template: `
        <div class="col-xs-12 heigth-500">
            <div class="row">
                <div class="" *ngFor="let role of group.roleList | individualColumnSort: 'roleName': 'asc'">
                <span class="btn" (click)="removeRoleFromGroup(role)" *ngIf="canPersist">
                  <i class="fa fa-minus-circle" aria-hidden="true">
                  </i>
                </span>
                    <span
                        class="datafab-font-12">{{role.roleName}}{{role.locationName}}</span>
                </div>
            </div>
            <div class="row" *ngIf="canPersist">
                <div class="">
                <span class="btn" (click)="openAddRoleModal()">
                  <i class="fa fa-plus-circle" aria-hidden="true">
                  &nbsp;&nbsp;&nbsp; <span class="datafab-font-12">
                                    {{"GROUP_MANAGEMENT_ADD_NEW_ROLE" |translate}}
                                    </span>
                  </i>
                </span>
                </div>
            </div>
        </div>
    `
})

export class GroupRolesComponent implements OnInit {
    @Input() group;
    @Input() canPersist = false;
    // all reference location hierarchies
    public locationHierarchy: any;
    /**
     * add role to group modal ref
     */
    public addRoleModalRef: BsModalRef;
    /**
     * remove role confirm modal ref
     */
    public removeRoleConfirmModalRef: BsModalRef;

    // add location modal ref
    public addLocationModalRef: BsModalRef;
    public roleList: any = [];
    public availableRoles: any;
    // modal config.
    public config = {
        animated: true,
        keyboard: false,
        backdrop: true,
        ignoreBackdropClick: true
    };

    constructor(private modalService: BsModalService, @Inject('ReferenceAsyncCacheService') private referenceAsyncCacheService: ReferenceAsyncCacheService, private groupService: GroupService) {
    }

    ngOnInit() {
        this.referenceAsyncCacheService.getDataByKey('LOCATION_HIERARCHY').then(reference => {
            this.locationHierarchy = reference;
            this.loadAllRoles();
        });
    }

    loadAllRoles() {
        this.groupService.getAllRoles('').toPromise().then((res: any) => {
            const that = this;
            if (lodash.isArray(res)) {
                res.forEach((role: any) => {
                    if (!lodash.find(that.group.roleList, {'roleId': role.roleId})) {
                        that.roleList.push(role);
                    }
                });
            }
        });
    }


    /**
     * Set filter based on user current selected roles
     *
     * @author edqin
     * @memberof GroupRolesComponent
     */
    setFilters() {
        if (!lodash.isEmpty(this.group.roleList)) {
            this.availableRoles = this.roleList.filter(obj => {
                return !this.group.roleList.some(function(obj2) {
                    return obj.roleId === obj2.roleId;
                });
            });
        } else {
            this.availableRoles = this.roleList;
        }
    }

    /**
     * open add role modal
     */
    openAddRoleModal() {
        this.setFilters();
        const that = this;
        const modalOnHide: Subscription = that.modalService.onHide.subscribe(addRoleList => {
            modalOnHide.unsubscribe();
            // open add location modal
            if (addRoleList && addRoleList !== 'backdrop-click' && addRoleList !== 'esc') {
                const object = JSON.parse(addRoleList);
                const locationModalOnHide: Subscription = that.modalService.onHide.subscribe(location => {
                    if (location && addRoleList !== 'backdrop-click' && addRoleList !== 'esc') {
                        const keys = Object.keys(object);
                        if (keys && keys.length) {
                            keys.forEach(function (id) {
                                that.roleList.forEach(function (role) {
                                    if (Number(id) === role.roleId && object[id]) {
                                        role.locationTypeCode = Number(location);
                                        role.locationName = that.renderRoleLocation(Number(location));
                                        if (!that.group.roleList){
                                            that.group.roleList = [];
                                        }
                                        that.group.roleList.push(
                                            role
                                        );
                                    }
                                });
                            });
                        }
                        that.group.roleList = lodash.orderBy(that.group.roleList, 'roleName', 'asc');
                    }
                    locationModalOnHide.unsubscribe();
                });
                that.addLocationModalRef = that.modalService.show(AddLocationModalComponent, this.config);
                that.addLocationModalRef.content.group = that.group;
            }
        });
        that.addRoleModalRef = that.modalService.show(AddRoleModalComponent, this.config);
        that.addRoleModalRef.content.group = that.group;
        that.addRoleModalRef.content.roles = this.availableRoles;
    }

    /**
     * remove role from group
     */
    removeRoleFromGroup(role) {
        const that = this;
        const modalOnHide: Subscription = that.modalService.onHide.subscribe(isRemoved => {
            if (isRemoved && isRemoved === 'true') {
                const index = lodash.findIndex(that.group.roleList, {'roleId': role.roleId});
                that.group.roleList.splice(index, 1);
            }
            modalOnHide.unsubscribe();
        });
        that.removeRoleConfirmModalRef = that.modalService.show(RemoveRoleConfirmModalComponent, this.config);
        that.removeRoleConfirmModalRef.content.role = role;
        that.removeRoleConfirmModalRef.content.group = that.group;
    }

    /**
     * render location name
     * @param code
     */
    renderRoleLocation(id) {
        let res = '';
        if (id) {
            this.locationHierarchy.forEach(function (location) {
                if (Number(location.id) === Number(id)) {
                    res = ', ' + location.displayKey;
                }
            })
        }
        return res;
    }

}
