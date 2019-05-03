/**
 * Created Date: Sunday, July 16th 2017, 9:31:53 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
export class WorkItemModel {
    /**
     * the value of workflow instance id
     */
    workflowInstanceId: number;
    /**
     * the value of workItem id
     */
    workItemId: string;
    /**
     * the value of work item name
     */
    name: string;
    /**
     * the value of type
     */
    type: string;
    /**
     * the value of changeType
     */
    changeType: string;
    /**
     * the value of root work item id
     */
    rootWorkItemId: string;
    /**
     * the value of root work item name
     */
    rootWorkItemName: string;
    /**
     * the value of model
     */
    model: any;
    /**
     * the value of original model
     */
    originalModel: any;

    /**
     * the value of created by
     */
    createdBy: string;
    /**
     * the value of created On
     */
    createdOn: string;
    /**
     * the value of last modified by
     */
    lastModifiedBy: string;
    /**
     * the value of last modified on
     */
    lastModifiedOn: string;
    /**
     * Marked the workitem is locked
     *
     * @type {boolean}
     * @memberof WorkItemModel
     */
    isLocked: boolean;

    /**
     * Host any information for locked data
     *
     * @type {*}
     * @memberof WorkItemModel
     */
    lockedRef: any;

    /**
     * change reasons
     */
    changeReasons: any;

    /**
     * lock model
     */
    conflictLock: any;
}
