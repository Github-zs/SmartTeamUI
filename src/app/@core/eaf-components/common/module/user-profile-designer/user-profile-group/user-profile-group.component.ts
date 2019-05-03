/**
 * Created Date: Sunday, December 24th 2017, 09:53 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UserProfileMainModel } from '@platform/eaf-components/common/module/user-profile-designer/model/user-profile-main.model';
import { AddGroupModalComponent } from '@platform/eaf-components/common/module/user-profile-designer/user-profile-group/add-group-modal.component';
import { GroupService } from '@platform/eaf-components/common/services/http/group-http.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
    selector: 'user-profile-group',
    templateUrl: 'user-profile-group.component.html',
    styleUrls: ['user-profile-group.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserProfileGroupComponent implements OnInit {

    private _user: UserProfileMainModel;
    private _editMode: boolean = false;
    private _allGroups: any;
    private _availableGroups: any;
    private _modalRef: BsModalRef;
    private _canPersistUser: boolean = false;
    private _canEdit: boolean = false;

    // modal config.
    public config = {
        animated: true,
        keyboard: false,
        backdrop: true,
        ignoreBackdropClick: true
    };

    public get canEdit(): boolean  {
        return this._canEdit;
    }

    @Input('canEdit')
    public set canEdit(value: boolean ) {
        this._canEdit = value;
    }

    public get allGroups(): any {
        return this._allGroups;
    }

    public set allGroups(value: any) {
        this._allGroups = value;
    }

    public get availableGroups(): any {
        return this._availableGroups;
    }

    public set availableGroups(value: any) {
        this._availableGroups = value;
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

    public get user(): UserProfileMainModel {
        return this._user;
    }

    @Input('user')
    public set user(value: UserProfileMainModel) {
        this._user = value;
    }

    public get canPersistUser(): boolean  {
        return this._canPersistUser;
    }
    @Input('canPersistUser')
    public set canPersistUser(value: boolean ) {
        this._canPersistUser = value;
    }

    constructor(
        private modalService: BsModalService,
        private groupService: GroupService) {
    }

    ngOnInit(): void {
        this.initAllGroups();
    }

    initAllGroups() {
        this.groupService.getAllGroups().subscribe((groups) => {
            this.allGroups = groups;
            this.setFilters();
        });
    }

    setFilters() {
        if (this.user.groupList && this.user.groupList.length > 0) {
            this.availableGroups = this.allGroups.filter((obj) => {
                return !this.user.groupList.some(function(obj2) {
                    return obj['groupId'] === obj2['groupId'];
                });
            })
        } else {
            this.availableGroups = this.allGroups;
        }
    }

    /**
     * Open select group modal
     *
     * @memberof UserProfileGroupComponent
     */
    openGroupModal() {
        this.setFilters();
        const modalOnHide: Subscription = this.modalService.onHide.subscribe(
            selectedItems => {
                modalOnHide.unsubscribe();
                const tempItemList = JSON.parse(selectedItems);
                if (!_.isEmpty(tempItemList)) {
                    for (let i = 0; i < tempItemList.length; i++) {
                        if (!this.user.groupList) {
                            this.user.groupList = [];
                        }
                        this.user.groupList.push(tempItemList[i]);
                    }
                }
            }
        );
        this.modalRef = this.modalService.show(
            AddGroupModalComponent, this.config
        );
        this.modalRef.content.availableGroup = this.availableGroups;
        this.modalRef.content.filteredData = this.availableGroups;
    }

    /**
     * Remove group
     *
     * @param {any} removedGroup
     * @memberof UserProfileGroupComponent
     */
    removeGroup($event, removedGroup) {
        if ($event && this.user.groupList) {
            this.user.groupList.forEach((currentGroup, index) => {
                if (currentGroup.groupId === removedGroup.groupId) {
                    this.user.groupList.splice(index, 1);
                    return;
                }
            });
        }
    }
}
