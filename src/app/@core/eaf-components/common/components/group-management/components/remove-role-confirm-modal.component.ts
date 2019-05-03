/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {Component} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
    selector: 'remove-role-confirm-modal',
    styleUrls: ['../group-management.component.scss'],
    template: `
        <div class="modal-header">
            <h4 class="modal-title pull-left">{{"GROUP_MANAGEMENT_REMOVE_ROLE" |translate}}</h4>
            <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-xs-12">
                    <p>
                        {{"GROUP_MANAGEMENT_REMOVE_ROLE_FROM_GROUP" |translate}}
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
                    <button  class="btn datafab-btn-primary"
                        (click)="bsModalRef.hide();applyRemoveRole()">
                        {{'WORKFLOW_MANAGEMENT_OK' | translate}}
                    </button>
                    <button  class="btn btn-default"
                            (click)="bsModalRef.hide();cancelRemoveRole()">
                        {{'WORKFLOW_MANAGEMENT_CANCEL' | translate}}
                    </button>
                </div>
            </div>
        </div>
    `
})

export class RemoveRoleConfirmModalComponent {
    role: any;
    group: any;

    constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) {
    }

    applyRemoveRole() {
        this.modalService.setDismissReason(JSON.stringify(true))
    }

    cancelRemoveRole() {

    }
}
