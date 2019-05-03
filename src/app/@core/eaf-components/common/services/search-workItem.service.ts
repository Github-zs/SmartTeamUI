/**
 * Created Date: Wednesday, December 6th 2017, 11:45:51 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Inject, Injectable } from '@angular/core';
import { CommonConstant } from '@platform/common/constants/common.constant';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import {
    WORKFLOW_HTTP_TOKEN,
    WorkflowHttpServiceInterface
} from '@platform/common/services/workflow-http.service.interface';

@Injectable()
export class SearchWorkItemService {

    constructor(@Inject(WORKFLOW_HTTP_TOKEN)
                protected workflowHttpService: WorkflowHttpServiceInterface) {
    }

    /**
     * search exist hierarchy workItem by instance id and parent entityId and child entityId
     * @param parentId
     * @param childId
     * @param instanceId
     * @returns Observable{any}
     */
    searchHierarchyRelatedWorkItem(parentId, childId, instanceId): Observable<any> {
        return this.getHierarchyItemsByParentAndChildId(instanceId, childId).map(list => {
            const matchId: string = CommonConstant.HIERARCHY.WORK_ITEM + parentId + CommonConstant.HIERARCHY.SEPARATOR + childId;
            let workItem = null;
            if (!_.isEmpty(list)) {
                list.forEach(function (item) {
                    if (item.workItemId === matchId && Number(item.workflowInstanceId) === Number(instanceId)) {
                        workItem = _.cloneDeep(item);
                    }
                    // for hierarchy move workItem
                    if (!workItem && item.type === CommonConstant.WORK_ITEM_TYPE.HIERARCHY && Number(item.workflowInstanceId) === Number(instanceId)) {
                        // when move a newly created relationship workitem.
                        if (item.changeType === CommonConstant.HIERARCHY.CHANGE_TYPE.ADD) {
                            const ids = item.workItemId.replace(CommonConstant.HIERARCHY.WORK_ITEM, '').split(CommonConstant.HIERARCHY.SEPARATOR);
                            if (ids[1] == childId) {
                                workItem = _.cloneDeep(item);
                            }
                        } else if (item.changeType === CommonConstant.HIERARCHY.CHANGE_TYPE.MOVE) {
                            const ids = item.workItemId.replace(CommonConstant.HIERARCHY.WORK_ITEM, '').split(CommonConstant.HIERARCHY.SEPARATOR);
                            if (ids.length === 3 && ids[0] == parentId && ids[2] == childId) {
                                workItem = _.cloneDeep(item);
                            } else if (ids.length === 2 && ids[0] == parentId && ids[1] == childId) {
                                workItem = _.cloneDeep(item);
                            }
                        }

                    }
                });
                return workItem;
            }
        });
    }

    /**
     * search exist hierarchy workItem by instance id and workItemId
     * @param workItemId
     * @param instanceId
     * @returns Observable{any}
     */
    searchWorkItemById(workItemId, instanceId): Observable<any> {
        return this.workflowHttpService.searchWorkflowItemById(instanceId, workItemId);
    }

    /**
     * search legal names by workitem id
     *
     * @param workflowInstanceId
     * @param itemIds
     * @return {'entityId': 'legalName', ...}
     */
    searchLegalNamesByItemIds(workflowInstanceId: number, itemIds?: string[]): Observable<any> {
        return this.workflowHttpService.getLegalNamesByItemIds(workflowInstanceId, itemIds);
    }

    /**
     * search all exist workItems by item type and instance id
     * @param {string} itemType
     * @param {any} instanceId
     * @returns {Array<any>}
     * @memberof SearchWorkItemService
     */
    searchWorkItemByTypeAndInstanceId(itemType, instanceId): Observable<Array<any>> {
        return this.workflowHttpService.getLightWorkItemByType(itemType, instanceId).map((response) => {
            const workItemList = [];
            if (!_.isEmpty(response)) {
                response.forEach((rawWorkItem) => {
                    workItemList.push(rawWorkItem.workItem);
                });
            }
            return workItemList;
        });
    }

    /**
     * Get hierarchy workitem by instance id and legal entity id
     *
     * @param workflowInstanceId A workflow instance id
     * @return
     */
    getHierarchyItemsByParentAndChildId(workflowInstanceId, entityId): Observable<any> {
        return this.workflowHttpService.getHierarchyItemsByParentAndChildId(workflowInstanceId, entityId);
    }

    /**
     * search all exist workItems by instance id
     * @param {any} instanceId
     * @returns {Array<any>}
     * @memberof SearchWorkItemService
     */
    searchAllWorkItemByInstanceId(instanceId): Observable<any> {
        return this.workflowHttpService.getRealAllWorkflowItems(instanceId);
    }
}




