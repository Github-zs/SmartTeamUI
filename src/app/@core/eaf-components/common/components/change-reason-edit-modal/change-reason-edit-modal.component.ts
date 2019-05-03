/**
 * Created Date: Monday, December 18th 2017, 06:16:27 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';
import { ChangeReasonModel } from '@platform/eaf-components/common/model/common/change-reason.model';
import {PlatformBaseModalComponent} from "../../../../common/components/platform-base-modal-component";
import {TranslateService} from "@ngx-translate/core";
import {Location} from "@angular/common";

@Component({
    selector: 'ksc-change-reason-edit-modal',
    templateUrl: './change-reason-edit-modal.component.html',
    styleUrls: ['./change-reason-edit-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChangeReasonEditModalComponent extends PlatformBaseModalComponent implements OnInit {
    public changeReasonObj: ChangeReasonModel;
    public crOptions: Array<object>;
    public options: Select2Options;
    private _isRemoveGroup: boolean = false;

    public get isRemoveGroup(): boolean {
        return this._isRemoveGroup;
    }

    public set isRemoveGroup(value: boolean) {
        this._isRemoveGroup = value;
    }

    constructor(
        public bsModalRef: BsModalRef,
        private bsModalService: BsModalService,
        public location: Location) {
        super(bsModalRef, location);
    }

    onSelected($event) {
        this.changeReasonObj.selectedReasonCode = _.parseInt($event.value);
        // when user selected Other from change reason list.
        if (this.changeReasonObj.selectedReasonCode !== 40015 && this.changeReasonObj.selectedReasonCode !== 650004 && this.changeReasonObj.selectedReasonCode !== 730002
            && this.changeReasonObj.selectedReasonCode !== 740002 && this.changeReasonObj.selectedReasonCode !== 750003) {
            this.changeReasonObj.selectedReasonName = $event.data[0]['displayKey'];
        } else {
            this.changeReasonObj.selectedReasonName = null;
        }
    }

    skip() {
        const abandonChangeReason = _.cloneDeep(this.changeReasonObj);
        abandonChangeReason.selectedReasonCode = null;
        abandonChangeReason.selectedReasonName = null;
        abandonChangeReason.comment = null;
        this.bsModalService.setDismissReason(
            JSON.stringify(abandonChangeReason)
        );
        this.bsModalRef.hide();
    }

    save() {
        this.bsModalService.setDismissReason(
            JSON.stringify(this.changeReasonObj)
        );
        this.bsModalRef.hide();
    }

    ngOnInit() {
        this.options = {
            placeholder: '',
            allowClear: false,
            width: '100%'
        };
    }
}
