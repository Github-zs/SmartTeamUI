/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {PlatformBaseModalComponent} from "../../../../../common/components/platform-base-modal-component";
import {TranslateService} from "@ngx-translate/core";
import {Location} from "@angular/common";

@Component({
    selector: 'add-role-modal',
    styleUrls: ['../group-management.component.scss'],
    template: `
        <div class="modal-header">
            <h4 class="modal-title pull-left">{{"GROUP_MANAGEMENT_SELECT_ROLES" |translate}}</h4>
            <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row heigth-500">
                <div class="col-xs-12">
                    <input class="form-control" type="text" [(ngModel)]="roleNameFilter"/>
                </div>
                <div class="col-xs-12">
                    <div *ngFor="let role of roles | individualColumnFilter: 'roleName' : roleNameFilter">
                        <label>
                            <input type="checkbox" [(ngModel)]="addRoleList[role.roleId]"/>
                            <span class="datafabric-font-style"> &nbsp;&nbsp;{{role.roleName}}</span>
                        </label>
                    </div>
                </div>

            </div>
        </div>
        <div class="modal-footer">
            <div class="row">
                <div class="col-xs-12 datafabric-btns-container text-right">
                    <button class="btn datafab-btn-primary width-64" [disabled]="displayAddRoleButton()" (click)="save()"> {{"WORKFLOW_MANAGEMENT_OK" |translate}}
                    </button>
                    <button class="btn datafab-btn-secondary width-64" (click)="bsModalRef.hide()">
                        {{"WORKFLOW_MANAGEMENT_CANCEL" |translate}}
                    </button>
                </div>
            </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})

export class AddRoleModalComponent extends PlatformBaseModalComponent implements OnInit {
    public group: any;
    public roles: any;
    public roleNameFilter: string;
    public addRoleList: object = {};

    constructor(public bsModalRef: BsModalRef, private modalService: BsModalService,
                public location: Location) {
        super(bsModalRef, location);
    }

    ngOnInit() {
    }

    save() {
        this.bsModalRef.hide();
        this.modalService.setDismissReason(JSON.stringify(this.addRoleList))
    }

    /**
     * display add role button
     */
    displayAddRoleButton() {
        let res = true;
        const that = this;
        const keys = Object.keys(that.addRoleList);
        if (keys && keys.length) {
            keys.forEach(function (id) {
                if (that.addRoleList[id]) {
                    res = false;
                }
            });
        }
        return res;
    }

}
