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
    selector: 'remove-permission-modal',
    template: `
    <div class="modal-header">
        <button type="button" class="close" (click)="hideModal(false)">×
        </button>
        <div class="modal-title caption-subject datafab-h6 datafab-font-regular">
        {{'GROUP_MANAGEMENT_REMOVE_PERMISSION' | translate}}
        </div>
    </div>
    <div class="modal-body">
        <div class="row" style="max-height:500px;overflow-y:auto">
            <div class="col-xs-12">
                <p>
                {{'ROLE_MANAGEMENT_REMOVE_PERMISSION_CONFIRM' | translate}}
                </p>
                <p>
               {{'GROUP_MANAGEMENT_REMOVE_CONFIRM' | translate}}
                </p>
            </div>
        </div>
        <div class="row spbrow">
            <div class="col-xs-12">
                <button style="width: 52px;" class="btn datafab-btn-secondary pull-right" (click)="hideModal(false)">
                {{'SEARCH_SUBSCRIPTION_CANCEL' | translate}}
                </button>
                <button style="width: 52px;" class="btn datafab-btn-primary pull-right"  (click)="hideModal(true)">
                {{'SEARCH_SUBSCRIPTION_OK' | translate}}
                </button>
            </div>
        </div>
    </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class RemovePermissionModalComponent extends PlatformBaseModalComponent {
    public selectedPermission;

    constructor(
        public bsModalRef: BsModalRef,
        private modalService: BsModalService,
        public location: Location) {
        super(bsModalRef, location);
    }
    hideModal(isSave) {
        if (isSave) {
            this.modalService.setDismissReason(JSON.stringify(this.selectedPermission));
        }
        this.bsModalRef.hide();
    }
}
