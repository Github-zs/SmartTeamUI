/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {Component, OnInit, Input} from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'group-details-component',
    styleUrls: [],
    template: `
        <div class="col-xs-12">
            <div class="row">
                <div class="col-xs-2">
                    <span>{{"WORKFLOW_MANAGEMENT_NAME" | translate}}</span>
                </div>
                <div class="col-xs-10" [class.has-error]="groupName.invalid  && (groupName.dirty || groupName.touched)">
                    <input type="text" class="form-control" name="groupName" id="groupName" #groupName="ngModel" [(ngModel)]="group.groupName" [disabled]="!canPersist" (blur)="removeBlanks(group.groupName, 'groupName')" required/>
                </div>
            </div>
            <div class="row spbrow">
                <div class="col-xs-2">
                    <span>{{"WORKFLOW_MANAGEMENT_DESCRIPTION" | translate}}</span>
                </div>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="groupDesc" id="groupDesc"  #groupDesc="ngModel" [(ngModel)]="group.groupDesc" [disabled]="!canPersist" (blur)="removeBlanks(group.groupDesc, 'groupDesc')"/>
                </div>
            </div>
            <div class="row spbrow">
                <div class="col-xs-2">
                    <span>{{"WORKFLOW_MANAGEMENT_ACTIVE" | translate}}</span>
                </div>
                <div class="col-xs-10">
                    <input type="checkbox" [(ngModel)]="group.isActive" [disabled]="!canPersist"/>
                </div>
            </div>
        </div>
    `
})

export class GroupDetailsComponent implements OnInit {
    @Input() group;
    @Input() canPersist = false;

    constructor() {
    }

    ngOnInit() {
    }

    removeBlanks(value, attr) {
        const valueWithoutBlank = _.trim(value);
        this.group[attr] = valueWithoutBlank;
    }
}
