/**
 * Created Date: Saturday, December 16th 2017, 07:08:49 pm
 * Author: KSC
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import {PlatformBaseModalComponent} from "../../../../../common/components/platform-base-modal-component";
import {TranslateService} from "@ngx-translate/core";
import {Location} from "@angular/common";

@Component({
    selector: 'add-permission-modal',
    template: `
    <div class="modal-header">
        <button type="button" class="close" (click)="hideModal(false)">×
        </button>
        <div class="modal-title caption-subject datafab-h6 datafab-font-regular">
            {{'GROUP_MANAGEMENT_SELECT_PERMISSIONS'|translate}}
        </div>
    </div>
    <div class="modal-body" style="max-height:500px;overflow-y:auto">
        <div class="row">
            <div class="col-xs-12">
                <input class="form-control" type="text" (keyup)="searchPermission($event.target.value)"/>
            </div>
        </div>
        <div  class="row" *ngFor="let permission of filteredData">
            <div class="col-xs-12">
                <input class="filter-data-checkbox-permission" type="checkbox" (click)="setPermission($event,permission)">
                <span>
                    &nbsp;&nbsp;{{ permission.permissionDesc }}
                </span>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <div class="row">
            <div class="col-xs-12 datafabric-btns-container text-right">
                <button style="width: 52px;" class="btn datafab-btn-primary" (click)="hideModal(true)">{{'SEARCH_SUBSCRIPTION_OK' | translate}}</button>
                <button style="width: 52px;" class="btn datafab-btn-secondary" (click)="hideModal(false)">{{'SEARCH_SUBSCRIPTION_CANCEL' | translate}}
                </button>
            </div>
        </div>
    </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AddPermissionModalComponent extends PlatformBaseModalComponent {
    public availablePermissions: Array<any> = [];
    public filteredData: Array<any> = [];
    public selectedPermissions: Array<any> = [];

    constructor(
        public bsModalRef: BsModalRef,
        private modalService: BsModalService,
        public location: Location) {
        super(bsModalRef, location);
    }

    searchPermission(val: any) {
        if (!val) {
            this.filteredData = this.availablePermissions;
        } else {
            this.filteredData = this.availablePermissions.filter(
                d => d.permissionDesc.toLowerCase().indexOf(val.toLowerCase()) >= 0
            );
        }
    }

    // set and unset permissions
    setPermission($event, permission) {
        if ($event.target.checked) {
            this.selectedPermissions.push(permission);
        } else {
            for (let i = 0; i < this.selectedPermissions.length; i++) {
                if (this.selectedPermissions[i].permissionId === permission.permissionId) {
                    this.selectedPermissions.splice(i, 1);
                    break;
                }
            }
        }
    }


     hideModal(isSave) {
        if (isSave) {
            this.modalService.setDismissReason(JSON.stringify(this.selectedPermissions));
        }
        this.bsModalRef.hide();
    }

}
