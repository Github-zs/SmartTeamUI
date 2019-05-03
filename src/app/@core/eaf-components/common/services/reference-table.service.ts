/**
 * Created Date: Saturday, July 8th 2017, 8:02:33 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Inject, Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ReferenceTreeNode } from '@platform/eaf-components/common/model/reference-data/reference-tree-node';
import { ReferenceAsyncCacheService } from '@platform/eaf-components/common/services/reference-async-cache.service';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';

/**
 * Service for any request to reference table micro service
 */
@Injectable()
export class ReferenceTableService {
    private _referenceData: { [category: string]: any } = {};

    constructor(private http: HttpClient, @Inject('ReferenceAsyncCacheService') private referenceAsync: ReferenceAsyncCacheService) {}

    /**
     * Get Reference data by given category string in clude inactive
     *
     * @param category
     */
    getReferenceDataByCategoryIncludeInactive(category: string): any[] {
        return this._referenceData[category];
    }

    /**
     * Get Reference data children list by given category string
     *
     * @param category
     */
    getReferenceChildren(category: string): Promise<ReferenceTreeNode[]> {
        const promise = new Promise<ReferenceTreeNode[]>((resolve, reject) => {
            setTimeout(() => {
                let treeNodeList: ReferenceTreeNode[] = [];
                this.referenceAsync.getDataByKey(category, '', true).then(result => {
                    if (_.isEmpty(result)) {
                        resolve([]);
                    } else {
                        let treeNode;
                        result.forEach((node) => {
                            treeNode = new ReferenceTreeNode();
                            treeNode.id = node.id;
                            treeNode.name = node.text;
                            treeNode.hasChildren = false;
                            treeNode.category = node.category;
                            treeNode.key = node.key;
                            treeNode.displayKey = node.displayKey;

                            treeNode.description = node.description;
                            treeNode.isActive = node.isActive;
                            treeNode.displayOrder = node.displayOrder;

                            treeNode.text = node.text;
                            treeNode.transactionId = node.transactionId;
                            treeNode.parentId = node.parentId;

                            treeNode.isSystemManaged = node.isSystemManaged;

                            treeNode.additionalAttributes = node.additionalAttributes;
                            treeNodeList.push(treeNode);
                        })
                    }
                    if ( category === 'LOCATION_HIERARCHY') {
                        treeNodeList = this.retrieveLocationHierarchyTree(treeNodeList);
                    } else {
                        treeNodeList.sort((a, b) => {return a.displayOrder - b.displayOrder})
                    }
                    resolve(treeNodeList);
                });
            });
        });
        return promise;
    }

    /**
     * retrieve Location Hierarchy Tree
     */
    retrieveLocationHierarchyTree(result: Array<any>) {
        result.forEach(f => {
            f.children = _(result).filter(g => g.parentId === f.id).value();
            if (!_.isEmpty(f.children)) {
                f.children.sort((a, b) => {return a.displayOrder - b.displayOrder});
            }
        });
        let resultArray = _(result).filter(f => f.parentId == null).value();
        resultArray = _.orderBy(resultArray, ['displayOrder'], ['asc']);
        _.forEach(resultArray, (root: any) => {
            root.children = _.orderBy(root.children, ['displayOrder'], ['asc']);
        });
        return resultArray;
    }

    /**
     * clean unnecessary data on the tree node when save workitem.
     */
    refactorReferenceOrderList(tempList: ReferenceTreeNode[]) {
        tempList.forEach((item) => {
            item.mainTransactionId = item.transactionId;
            if (item.isAdded) {
                item.id = item.id > 0 ? -item.id : item.id;
            }
            if (!_.isEmpty(item.children)) {
                this.refactorReferenceOrderList(item.children);
            }
        });
        return tempList;
    }
}
