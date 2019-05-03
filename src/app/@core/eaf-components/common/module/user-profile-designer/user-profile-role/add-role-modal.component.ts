/**
 * Created Date: Sunday, December 24th 2017, 07:08 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import * as _ from 'lodash';
import {TranslateService} from "@ngx-translate/core";
import {Location} from "@angular/common";
import {PlatformBaseModalComponent} from "../../../../../common/components/platform-base-modal-component";

@Component({
    selector: 'add-role-modal',
    template: `
    <div class="modal-header">
        <button type="button" class="close" (click)="hideModal(false)">×
        </button>
        <div class="modal-title caption-subject datafab-h6 datafab-font-regular">
        {{'GROUP_MANAGEMENT_SELECT_ROLES' | translate}}
        </div>
    </div>
    <div class="modal-body">
        <div class="row" style="max-height:500px; overflow-y:auto">
            <div class="col-xs-12">
                <input class="form-control" type="text" (keyup)="searchRole($event.target.value)"/>
            </div>
        </div>
        <div class="row" *ngFor="let role of filteredData">
            <div class="col-xs-12">
                <label>
                        <input class="filter-data-checkbox" type="checkbox" [checked]="checkStatus(role)" (click)="toggleSelectRole($event, role)">
                        <span class="datafabric-font-style"> &nbsp;&nbsp;{{ role.roleName }}</span>
                </label>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <div class="row">
            <div class="col-xs-12 datafabric-btns-container text-right">
                <button class="btn datafab-btn-primary" [disabled]="hasSelected" (click)="hideModal(true)">{{'WORKFLOW_MANAGEMENT_OK' | translate}}</button>
                <button  class="btn datafab-btn-secondary" (click)="hideModal(false)">{{'WORKFLOW_MANAGEMENT_CANCEL' | translate}}</button>
            </div>
        </div>
    </div>
    `
})
export class AddRoleModalComponent extends PlatformBaseModalComponent {

    public selectedRoles = [];
    public availableRole = [];
    public filteredData = [];
    public hasSelected = true;

    constructor(
        public bsModalRef: BsModalRef,
        private modalService: BsModalService,
        public location: Location) {
        super(bsModalRef, location);
    }

    searchRole(val: any) {
        if (!val) {
            this.filteredData = this.availableRole;
        } else {
            this.filteredData = this.availableRole.filter(
                d => d.roleName.toLowerCase().indexOf(val.toLowerCase()) >= 0
            );
        }
    }

    toggleSelectRole($event, Role) {
        if ($event.target.checked) {
            this.selectedRoles.push(Role);
        } else {
            _.remove(this.selectedRoles, (selectedRole: any) => {
                return selectedRole.roleId === Role.roleId
            });
        }
        if (_.isEmpty(this.selectedRoles)) {
            this.hasSelected = true;
        }else {
            this.hasSelected = false;
        }
    }

    hideModal(isSave) {
        if (isSave) {
            this.modalService.setDismissReason(JSON.stringify(this.selectedRoles));
        }
        this.bsModalRef.hide();
    }

    checkStatus(role): boolean {
        let checked = false;
        for (let i = 0; i < this.selectedRoles.length; i++) {
            if (role.roleId === this.selectedRoles[i].roleId) {
                checked = true;
                break;
            }
        }
        return checked;
    }
}
