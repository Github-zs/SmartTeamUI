/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {Component} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
    selector: 'mark-supervisor-modal',
    styleUrls: ['../group-management.component.scss'],
    template: `
        <div class="modal-header">
            <h4 class="modal-title pull-left">{{"GROUP_MANAGEMENT_CONFIRM" |translate}}</h4>
            <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide();cancel()">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-xs-12">
                    <p>
                        {{"GROUP_MANAGEMENT_MARK_SUPERVISOR" |translate}}
                    </p>
                    <p>
                        {{"WORKFLOW_MANAGEMENT_REMOVE_CONFIRM" |translate}}
                    </p>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="row">
                <div class="col-xs-12 datafabric-btns-container text-right">
                    <button class="btn datafab-btn-primary width-64" (click)="bsModalRef.hide();save()">
                        {{"WORKFLOW_MANAGEMENT_OK" |translate}}
                    </button>
                    <button class="btn datafab-btn-secondary width-64" (click)="bsModalRef.hide();cancel()">
                        {{"WORKFLOW_MANAGEMENT_CANCEL" |translate}}
                    </button>
                </div>
            </div>
        </div>
    `
})

export class MarkSupervisorModalComponent {
    user: any;

    constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) {
    }

    save() {
        this.modalService.setDismissReason(JSON.stringify(true))
    }

    cancel() {
        this.modalService.setDismissReason('');
    }
}
