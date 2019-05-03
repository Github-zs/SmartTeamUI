/**
 * Created Date: Friday, September 22nd 2017, 12:52:21 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {Inject, Pipe, PipeTransform} from '@angular/core';
import {STORAGE_MODEL_HELPER_TOKEN, StorageModelHelperInterface} from '../services/storage-model-helper.interface';

@Pipe({name: 'formatWidgetCommonParams'})
export class FormatWidgetCommonParamsPipe implements PipeTransform {
    constructor(@Inject(STORAGE_MODEL_HELPER_TOKEN)
                private storageHelperService: StorageModelHelperInterface) {
    }

    transform(data: any): string {
        if (data == null) {
            return ''
        }
        ;
        let params: string = '?fromDt=' + data.fromDate
            + '&toDt=' + data.toDate
            + '&isMyself=' + data.myself
            + '&isEveryOne=' + data.everyone;
        if (data.group) {
            if (data.groupList && data.groupList.length > 0 && data.groupList[0]) {
                params += '&groupList=' + data.groupList + '&isGroup=' + data.group;
            }
        }
        if (data.task_status) {
            if (data.task_status && data.task_status.length > 0 && data.task_status[0]) {
                params += '&taskStatusCodeList=' + data.task_status;
            }
        }

        if (data.workflow) {
            if (data.workflow && data.workflow.length > 0 && data.workflow[0]) {
                params += '&workflowDefIdList=' + data.workflow;
            }
        }
        if (data.myself) {
            params += '&userId=' + this.storageHelperService.getItem('user')['userId']
        }
        return params;
    }
}
