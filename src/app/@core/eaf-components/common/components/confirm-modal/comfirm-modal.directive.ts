/**
 * Created Date: Tuesday, December 5th 2017, 1:35:45 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ConfirmModalComponent } from '@platform/eaf-components/common/components/confirm-modal/confirm-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';

@Directive({
    selector: '[confirm-modal]'
})
export class ConfirmModalDirective {

    @Input('title') public title: string;
    @Input('content') public content: string;
    @Output() confirmResult: EventEmitter<boolean> = new EventEmitter();

    // modal config.
    public config = {
        animated: true,
        keyboard: false,
        backdrop: true,
        ignoreBackdropClick: true
    };

    public bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {
    }

    @HostListener('click', ['$event'])
    public openModel() {
        const modalOnHidden: Subscription = this.modalService.onHidden.subscribe(res => {
            modalOnHidden.unsubscribe();
                this.confirmResult.emit(JSON.parse(res));
        });
        this.bsModalRef = this.modalService.show(ConfirmModalComponent, this.config);
        this.bsModalRef.content.title = this.title;
        this.bsModalRef.content.content = this.content;
    }
}
