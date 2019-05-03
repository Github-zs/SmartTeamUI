/**
 * Created Date: Friday, December 22nd 2017, 02:14:51 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {PlatformBaseModalComponent} from "../../../../../common/components/platform-base-modal-component";
import {Location} from "@angular/common";

@Component({
    selector: 'add-members-search-modal',
    template: `
        <div class="modal-header">
            <button type="button" class="close" (click)="cancel()">×
            </button>
            <div class="modal-title caption-subject datafab-h6 datafab-font-regular">
                {{'GROUP_MANAGEMENT_SELECT_USERS' | translate}}
            </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        </div>
        <div class="modal-body" style="min-height: calc(40vh); overflow-y: auto;">
            <div class="col-xs-12">
                <user-searching [hideAddButton]="hideAddButton" [domain]="domain" (selectedRows)="onSelectedRows($event)"></user-searching>
            </div>
        </div>
        <div class="modal-footer datafabric-btns-container text-right">
            <button class="btn datafab-btn-primary" (click)="ok()" [disabled]="!(userList && userList.length > 0)">{{'WORKFLOW_MANAGEMENT_OK' | translate}}</button>
            <button class="btn datafab-btn-secondary" (click)="cancel()">{{'WORKFLOW_MANAGEMENT_CANCEL' | translate}}</button>
        </div>
  `
})
export class AddMembersSearchModalComponent extends PlatformBaseModalComponent implements OnInit {
    public domain: string = 'add_item';
    public userList: Array<object>;
    public hideAddButton: boolean = true;
    constructor(
        public bsModalRef: BsModalRef,
        private bsModalService: BsModalService,
        public location: Location) {
        super(bsModalRef, location);
    }
    public onSelectedRows($event) {
        this.userList = $event;
    }

    public cancel() {
        this.bsModalRef.hide();
    }

    public ok() {
        this.bsModalService.setDismissReason(JSON.stringify(this.userList));
        this.bsModalRef.hide();
    }
    ngOnInit() {}
}
