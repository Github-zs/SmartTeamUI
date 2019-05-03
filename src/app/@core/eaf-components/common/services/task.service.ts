/**
 * Created Date: Tuesday, October 31st 2017, 2:39:22 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonConstant } from '@platform/common/constants/common.constant';
import { Url } from '@platform/common/constants/url.constant';
import {
    STORAGE_MODEL_HELPER_TOKEN,
    StorageModelHelperInterface
} from '@platform/eaf-components/common/services/storage-model-helper.interface';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class TaskService {

    private isUpToDate = true;
    @Output() taskChanges: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private http: HttpClient,
        @Inject(STORAGE_MODEL_HELPER_TOKEN)
        private storageHelperService: StorageModelHelperInterface) {
    }

    /**
     * get task number for header
     *
     * @param {any} param
     * @returns {*}
     * @memberof TaskService
     */
    getTaskNumber(param): Observable<any> {
        return this.http.get(Url.TASK + (!param ? '' : param));
    };

    checkCanEdit(task: any, includeCollaborator: boolean = true) {
        let canEdit = false;
        if (task && this.checkIsAssignedUserOrCollaborator(task, includeCollaborator)
            && !this.checkIsCancelOrCompleteTask(task)) {
            canEdit = true;
        }
        return canEdit;
    }

    /**
     *  to judge the Transitions show Action Button
     *
     * @param {any} param
     * @returns {*}
     * @memberof TaskService
     */
    checkCanTransaction(task: any, includeCollaborator: boolean = true) {
        let canTransaction = false;
        if (task && this.checkIsAssignedUserOrCollaborator(task, includeCollaborator)
            && !this.checkTaskTransaction(task)) {
            canTransaction = true;
        }
        return canTransaction;
    }

    checkIsCancelOrCompleteTask(task) {
        let res = false;
        if (task && task.workflowInstanceModel) {
            const instance = task.workflowInstanceModel;
            if (instance.statusCode === CommonConstant.DATAFABRIC_TASK_INSTANCE_CD.WORKFLOW_INSTANCE_CANCELLED ||
                instance.statusCode === CommonConstant.DATAFABRIC_TASK_INSTANCE_CD.WORKFLOW_INSTANCE_COMPLETED ||
                instance.statusCode === CommonConstant.DATAFABRIC_TASK_INSTANCE_CD.WORKFLOW_INSTANCE_ON_HOLD ||
                task.statusCode === CommonConstant.DATAFABRIC_TASK_STATUS_CD.TASK_COMPLETED ||
                task.statusCode === CommonConstant.DATAFABRIC_TASK_STATUS_CD.TASK_CANCELLED
            ) {
                res = true;
            }
        }
        return res;
    }

    checkTaskTransaction(task) {
        let des = false;
        if (task && task.workflowInstanceModel) {
            const instance = task.workflowInstanceModel;
            if (instance.statusCode === CommonConstant.DATAFABRIC_TASK_INSTANCE_CD.WORKFLOW_INSTANCE_CANCELLED ||
                instance.statusCode === CommonConstant.DATAFABRIC_TASK_INSTANCE_CD.WORKFLOW_INSTANCE_COMPLETED ||
                task.statusCode === CommonConstant.DATAFABRIC_TASK_STATUS_CD.TASK_COMPLETED ||
                task.statusCode === CommonConstant.DATAFABRIC_TASK_STATUS_CD.TASK_CANCELLED
            ) {
                des = true;
            }
        }
        return des;
    }

    /**
     * check assigned user and collaborator
     * @param task includeCollaborator
     * @returns {boolean}
     */
    checkIsAssignedUserOrCollaborator(task, includeCollaborator: boolean = true): boolean {
         if (includeCollaborator) {
             return this.storageHelperService.getItem('user').userId === task.assignedUserId ||
                 !_.isEmpty(_.find(task.taskCollaborators, {'userId' : this.storageHelperService.getItem('user').userId}));
         } else {
             return this.storageHelperService.getItem('user').userId === task.assignedUserId;
         }
    }
    // refresh task number of header component.
    refreshTaskNumber() {
        this.isUpToDate = false;
        this.taskChanges.emit(this.isUpToDate);
    }

    setUpDated() {
        this.isUpToDate = true;
    }
}
