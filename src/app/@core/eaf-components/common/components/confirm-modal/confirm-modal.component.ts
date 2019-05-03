/**
 * Created Date: Tuesday, December 5th 2017, 1:35:45 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap';
import {PlatformBaseModalComponent} from "../../../../common/components/platform-base-modal-component";
import {TranslateService} from "@ngx-translate/core";
import {Location} from "@angular/common";

@Component({
    selector: 'confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent extends PlatformBaseModalComponent implements OnInit {
    title: string = '';
    content: string = '';

    constructor(private bsModalService: BsModalService, public bsModalRef: BsModalRef,
                public location: Location) {
        super(bsModalRef, location);
    }

    ngOnInit() {}

    confirm(): void {
        this.bsModalService.setDismissReason(JSON.stringify(true));
        this.bsModalRef.hide();
    }

    decline(): void {
        this.bsModalService.setDismissReason(JSON.stringify(false));
        this.bsModalRef.hide();
    }

    init(title, content) {
        this.title = title;
        this.content = content;
    }
}
