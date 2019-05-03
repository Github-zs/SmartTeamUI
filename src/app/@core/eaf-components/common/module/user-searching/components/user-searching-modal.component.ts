/**
 * Created Date: Friday, December 22nd 2017, 02:14:51 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

/**
 * Created Date: Friday, December 22nd 2017, 02:14:51 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {PlatformBaseModalComponent} from "../../../../../common/components/platform-base-modal-component";
import {TranslateService} from "@ngx-translate/core";
import {Location} from "@angular/common";

@Component({
    selector: 'user-picker',
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
                <user-searching [hideAddButton]="hideAddButton" [domain]="domain" (rowClick)="rowClick($event)"></user-searching>
            </div>
        </div>

  `
})
export class UserSearchingModalComponent extends PlatformBaseModalComponent implements OnInit {
    public domain: string = 'select_user';
    public userList: Array<object>;
    public hideAddButton: boolean = true;
    constructor(
        public bsModalRef: BsModalRef,
        private bsModalService: BsModalService,
        public location: Location) {
        super(bsModalRef, location);
    }

    public rowClick($event) {
        this.bsModalService.setDismissReason(JSON.stringify($event));
        this.bsModalRef.hide();
    }

    cancel() {
        this.bsModalRef.hide();
    }

    ngOnInit() {}
}
