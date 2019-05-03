/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ReferenceAsyncCacheService } from '@platform/eaf-components/common/services/reference-async-cache.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { IActionMapping, ITreeOptions, TREE_ACTIONS } from 'angular-tree-component';

@Component({
    selector: 'add-location-modal',
    styleUrls: ['../group-management.component.scss'],
    template: `
        <div class="modal-header">
            <h4 class="modal-title pull-left">{{"GROUP_MANAGEMENT_SELECT_LOCATION" |translate}}</h4>
            <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row heigth-500">
                <div class="col-xs-12">
                    <div class="col-xs-12">
                        <tree-root
                            *ngIf="nodes"
                            [nodes]="nodes"
                            #tree
                            [options]="options"
                        >

                            <ng-template #treeNodeTemplate let-node>
                                <div class="node-name-wrapper">
                                    <span>
                                        {{ node.data.name }} &nbsp; ({{node.data.additionalAttributes['Location Type']}})
                                    </span>
                                </div>

                            </ng-template>

                        </tree-root>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="row">
                <div class="col-xs-12 datafabric-btns-container text-right">
                    <button class="btn datafab-btn-primary width-64" [disabled]="!currentNode" (click)="save();bsModalRef.hide()">
                        {{"WORKFLOW_MANAGEMENT_OK" |translate}}
                    </button>
                    <button class="btn btn-default width-64" (click)="bsModalRef.hide()">
                        {{"WORKFLOW_MANAGEMENT_CANCEL" |translate}}
                    </button>
                </div>
            </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})

export class AddLocationModalComponent implements OnInit {
    public group;
    public roles;

    public currentNode;
    // all reference location types
    public locationTypes: any;
    // all reference location hierarchies
    public locationHierarchy: any;
    public nodes;

    public actionMapping: IActionMapping = {
        mouse: {
            click: (tree, node, $event) => {
                TREE_ACTIONS.SELECT(tree, node, $event);
                this.currentNode = node.data;
            }
        }
    };

    public options: ITreeOptions = {
        actionMapping: this.actionMapping,
        nodeHeight: 22,
    };

    constructor(public bsModalRef: BsModalRef, @Inject('ReferenceAsyncCacheService') private referenceAsyncCacheService: ReferenceAsyncCacheService, private modalService: BsModalService) {
    }

    save() {
        const that = this;
        this.modalService.setDismissReason(that.currentNode.key);
    }

    ngOnInit() {
        Promise.all([this.referenceAsyncCacheService.getDataByKey('LOCATION_HIERARCHY'),
            this.referenceAsyncCacheService.getDataByKey('LOCATION_TYPE')
        ]).then(referenceArr => {
            this.locationHierarchy = referenceArr[0];
            this.locationTypes = referenceArr[1];
            this.retrieveLocationNodes();
        })
    }

    /**
     * retrieve Location nodes
     */
    public retrieveLocationNodes() {
        const nodes = [];
        const nodesArr = this.retrieveLocationHierarchy(this.locationHierarchy, null);
        for (let j = 0; j < nodesArr.length; j++) {
            nodes.push(nodesArr[j]);
        }
        const children = [];
        for (let j = 0; j < nodes[0].children.length; j++) {
            children.push(nodes[0].children[j]);
        }
        nodes[0].children = children;
        this.nodes = nodes;
    }

    /**
     * retrieveLocationHierarchy
     *
     * @private
     * @param {any} ary
     * @param {any} data
     * @returns
     * @memberof UserProfileDesignerService
     */
    private retrieveLocationHierarchy(ary, data) {
        data = data ? data : (function (ary) {
            const tempAry = [];
            const idList = [];
            for (let i = 0; i < ary.length; i++) {
                idList.push(ary[i].id);
            }

            function deb(id, idList) {
                let flag = true;
                for (const ida in idList) {
                    if (id === idList[ida]) {
                        flag = false;
                    }
                }
                return flag;
            }

            for (let i = 0, len = ary.length; i < len; i++) {
                if (ary[i].parentId === undefined || (ary[i].parentId !== undefined && deb(ary[i].parentId, idList))) {
                    const obj = {
                        name: ary[i].displayKey,
                        id: ary[i].id,
                        key: ary[i].key,
                        additionalAttributes: ary[i].additionalAttributes
                    };
                    tempAry.push(obj);
                }
            }
            return tempAry;
        }(ary));
        let temp = 0;
        if (data.constructor === Array) {
            for (let i = 0, len = data.length; i < len; i++) {
                for (let j = 0, lenA = ary.length; j < lenA; j++) {
                    if (ary[j].parentId === data[i].id) {
                        const obj = {
                            name: ary[j].displayKey,
                            id: ary[j].id,
                            key: ary[j].key,
                            additionalAttributes: ary[j].additionalAttributes
                        };
                        data[i].children = data[i].children || [];
                        data[i].children.push(obj);
                        temp++;
                    }
                }
            }
        }
        if (temp > 0) {
            if (data.constructor === Array) {
                for (let n = 0, lenB = data.length; n < lenB; n++) {
                    data[n].children = this.retrieveLocationHierarchy(ary, data[n].children ? data[n].children : []);
                    if (data[n].children.length === 0) {
                        delete data[n].children;
                    }
                    delete data[n].id;
                }
            }
        } else {
            for (let n = 0, lenB = data.length; n < lenB; n++) {
                delete data[n].id;
            }
        }
        return data;
    }

}
