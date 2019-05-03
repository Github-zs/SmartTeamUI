/**
 * Created Date: Sunday, December 24th 2017, 07:08 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import * as _ from 'lodash';
import {PlatformBaseModalComponent} from "../../../../../common/components/platform-base-modal-component";
import {TranslateService} from "@ngx-translate/core";
import {Location} from "@angular/common";

@Component({
    selector: 'add-group-modal',
    template: `
    <div class="modal-header">
        <button type="button" class="close" (click)="hideModal(false)">×
        </button>
        <div class="modal-title caption-subject datafab-h6 datafab-font-regular">
        {{'SELECT_GROUPS' | translate}}
        </div>
    </div>
    <div class="modal-body">
        <div class="row" style="max-height:500px;overflow-y:auto">
            <div class="col-xs-12">
                <input class="form-control" type="text" (keyup)="searchGroup($event.target.value)"/>
            </div>
        </div>
        <div class="row" *ngFor="let group of filteredData">
            <div class="col-xs-12">
                <label>
                    <input class="filter-data-checkbox" type="checkbox" (click)="toggleSelectGroup($event,group)">
                    <span class="datafabric-font-style"> &nbsp;&nbsp;{{ group.groupName }}</span>
                </label>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <div class="row">
            <div class="col-xs-12 datafabric-btns-container text-right">
                <button class="btn datafab-btn-primary" [disabled]="hasSelected" (click)="hideModal(true)">{{'WORKFLOW_MANAGEMENT_OK' | translate}}</button>
                <button  class="btn datafab-btn-secondary" (click)="hideModal(false)">{{'WORKFLOW_MANAGEMENT_CANCEL' | translate}}</button>
            </div>
        </div>
    </div>
    `
})
export class AddGroupModalComponent extends PlatformBaseModalComponent {

    public selectedGroups = [];
    public availableGroup = [];
    public filteredData = [];
    public hasSelected = true;

    constructor(
        public bsModalRef: BsModalRef,
        private modalService: BsModalService,
        public location: Location) {
        super(bsModalRef, location);
    }

    searchGroup(val: any) {
        if (!val) {
            this.filteredData = this.availableGroup;
        } else {
            this.filteredData = this.availableGroup.filter(
                d => d.groupName.toLowerCase().indexOf(val.toLowerCase()) >= 0
            );
        }
    }

    toggleSelectGroup($event, group) {
        if ($event.target.checked) {
            this.selectedGroups.push(group);
        } else {
            this.selectedGroups.forEach((selectedGroup, index) => {
                if (selectedGroup.groupId === group.groupId) {
                    this.selectedGroups.splice(index, 1);
                    return;
                }
            });
        }
        if (_.isEmpty(this.selectedGroups)) {
            this.hasSelected = true;
        }else {
            this.hasSelected = false;
        }
    }

    hideModal(isSave) {
        if (isSave) {
            this.modalService.setDismissReason(JSON.stringify(this.selectedGroups));
        }
        this.bsModalRef.hide();
    }
}
