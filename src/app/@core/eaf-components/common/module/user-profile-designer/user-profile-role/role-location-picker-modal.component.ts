/**
 * Created Date: Friday, November 24th 2017, 3:22:48 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {Component} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {IActionMapping, ITreeOptions, TREE_ACTIONS,} from 'angular-tree-component';
import * as _ from 'lodash';
import {PlatformBaseModalComponent} from "../../../../../common/components/platform-base-modal-component";
import {Location} from "@angular/common";

@Component({
    selector: 'role-location-picker-modal',
    template: `
    <div class="modal-header">
        <button type="button" class="close" (click)="hideModal(false)">×
        </button>
        <div class="modal-title caption-subject datafab-h6 datafab-font-regular">
        {{'GROUP_MANAGEMENT_SELECT_LOCATION' | translate}}
        </div>
    </div>
    <div class="modal-body">
        <div class="row" style="max-height:500px;overflow-y:auto">
            <div class="col-xs-12">
                <tree-root *ngIf="nodes" [nodes]="nodes" #tree [options]="options">
                    <ng-template #treeNodeTemplate let-node>
                        <div class="node-name-wrapper">
                            <span>
                                {{ node.data.name? node.data.name : node.data.displayKey }} &nbsp; ({{node.data.additionalAttributes['Location Type']}})
                            </span>
                        </div>
                    </ng-template>
                </tree-root>
            </div>
        </div>
        <div class="row spbrow">
            <div class="col-xs-12">
                <button style="width: 52px;" class="btn datafab-btn-secondary pull-right" (click)="hideModal(false)">
                {{'WORKFLOW_MANAGEMENT_CANCEL' | translate}}
                </button>
                <button style="width: 52px;" class="btn datafab-btn-primary pull-right" [disabled]="!locationHir.locationTypeCode"  (click)="hideModal(true)">
                {{'WORKFLOW_MANAGEMENT_OK' | translate}}
                </button>
            </div>
        </div>
    </div>
    `
})
export class RoleLocationPickerModalComponent extends PlatformBaseModalComponent {

    public nodes;
    public locationHir = { locationTypeCode: null, locationDisplayName: null };
    public copyLocation;
    public locationArr = [];

    actionMapping: IActionMapping = {
        mouse: {
            click: (tree, node, $event) => {
                TREE_ACTIONS.SELECT(tree, node, $event);
                this.locationHir.locationTypeCode = Number.parseInt(node.data.key);
                this.locationHir.locationDisplayName = node.data.name;
            }
        }
    };

    options: ITreeOptions = {
        actionMapping: this.actionMapping,
        nodeHeight: 22
    };

    constructor(public bsModalRef: BsModalRef, private modalService: BsModalService,
                public loc: Location) {
        super(bsModalRef, loc);
    }

    getLocationNameByCode(code) {
        return _.find(this.locationArr, { 'key': String(code) }).displayKey;
    }

    hideModal(isSave) {
        if (isSave) {
            this.modalService.setDismissReason(this.locationHir.locationTypeCode);
        }
        this.bsModalRef.hide();
    }
}
