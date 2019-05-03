/**
 * Created Date: Tuesday, October 31st 2017, 2:23:32 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Inject, Injectable } from '@angular/core';
import { CommonConstant } from '@platform/common/constants/common.constant';
import { GlobalFilterModel } from '@platform/eaf-components/common/model/common/global-filter.model';
import {
    STORAGE_MODEL_HELPER_TOKEN,
    StorageModelHelperInterface
} from '@platform/eaf-components/common/services/storage-model-helper.interface';
import * as _ from 'lodash';

@Injectable()
export class CommonUtilsService {

    constructor(
        @Inject(STORAGE_MODEL_HELPER_TOKEN)
        private storageHelperService: StorageModelHelperInterface) {
    }

  /**
     * date: new Date
     * fmt: 'yyyy-MM-dd' or 'yyyy-MM-dd HH:mm:ss'
     * @param date
     * @param fmt
     * @returns {*}
     */
  formatDate(date: Date, fmt: string): string {
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    }
    _.forIn(o, (v, k) => {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        );
      }
    });
    return fmt;
  }

  /**
     * Construct Get request params with global filter
     * @param params: GlobalFilterModel globalFilter
     * @returns string
     */
  formatWidgetCommonParams(globalFilter: GlobalFilterModel): string {
    if (globalFilter == null) {
      return '';
    }
    let params: string =
      '?fromDt=' +
      globalFilter.fromDate +
      '&toDt=' +
      globalFilter.toDate +
      '&isMyself=' +
      globalFilter.myself +
      '&isEveryOne=' +
      globalFilter.everyone;
    if (globalFilter.group) {
      if (
        !_.isEmpty(globalFilter.groupList) && globalFilter.groupList[0]
      ) {
        params +=
          '&groupList=' +
          globalFilter.groupList +
          '&isGroup=' +
          globalFilter.group;
      }
    }
    if (globalFilter.task_status) {
      if (
        !_.isEmpty(globalFilter.task_status) && globalFilter.task_status[0]
      ) {
        params += '&taskStatusCodeList=' + globalFilter.task_status;
      }
    }
    if (globalFilter.workflow) {
      if (
        !_.isEmpty(globalFilter.workflow) && globalFilter.workflow[0]
      ) {
        params += '&workflowDefIdList=' + globalFilter.workflow;
      }
    }
    if (globalFilter.myself) {
      params += '&userId=' + this.storageHelperService.getItem('user')['userId'];
    }
    return params;
  }

  /**
     * Construct Post request params with global filter
     * @param params: GlobalFilterModel globalFilter
     * @returns string
     */
  formatWidgetCommonPostParams(globalFilter: GlobalFilterModel): object {
    if (globalFilter == null) {
      return {};
    }
    const params = {
      fromDt: globalFilter.fromDate,
      toDt: globalFilter.toDate,
      isMyself: globalFilter.myself,
      isEveryOne: globalFilter.everyone
    };

    if (globalFilter['group']) {
      if (
        globalFilter.groupList &&
        globalFilter.groupList.length > 0 &&
        globalFilter.groupList[0]
      ) {
        params['groupList'] = globalFilter.groupList;
        params['isGroup'] = globalFilter.group;
      }
    }
    if (globalFilter['task_status']) {
      if (
        !_.isEmpty(globalFilter.task_status) && globalFilter.task_status[0]
      ) {
        params['taskStatusCodeList'] = globalFilter.task_status;
      }
    }

    if (globalFilter['workflow']) {
      if (
        !_.isEmpty(globalFilter.workflow) && globalFilter.workflow[0]
      ) {
        params['workflowDefIdList'] = globalFilter.workflow;
      }
    }

    if (globalFilter['due_date_status']) {
      if (
        !_.isEmpty(globalFilter.due_date_status) && globalFilter.due_date_status[0]
      ) {
        params['includeDueDateStatus'] = globalFilter.task_status;
      }
    }

    if (globalFilter['change_items']) {
      if (
        !_.isEmpty(globalFilter.change_items) && globalFilter.change_items[0]
      ) {
        params['changeItems'] = globalFilter.change_items;
      }
    }

    if (globalFilter.myself) {
      params['userId'] = this.storageHelperService.getItem('user')['userId'];
    }
    return params;
  }
  /**
     * Set page parameter for ngtable to search parameters
     * @param params: Ngtable parameters
     * @param defaultOrderbyField: Default Order by Field with direction:
     * for instance: 'task_id desc'
     * @returns {*}
     */
  commonPaginationParamFormat(
    params: { page: number; count: number; orderBy: any },
    defaultOrderbyField: string
  ): string {
    let searchParam: string = '';
    searchParam += '&pageNum=' + params.page;
    searchParam += '&pageSize=' + params.count;
    searchParam += '&orderBy=' + params.orderBy;
    return searchParam;
  }

  commonPaginationPostParamFormat(
    queryParam: object,
    params: { page: number; count: number; orderBy: any },
    defaultOrderbyField: string
  ): object {
    queryParam['pageNum'] = params.page;
    queryParam['pageSize'] = params.count;
    queryParam['orderBy'] = params.orderBy;
    // default is to sort by defaultOrderbyField descend
    return queryParam;
  }

  // get the user agent type name.
    userAgentDetector(): string {
        let isIE = false;
        // Firefox 1.0+
        if (typeof window['InstallTrigger'] !== 'undefined') {
            return CommonConstant.USER_AGENT_TYPE.FF;
        }
        // Safari 3.0+ "[object HTMLElementConstructor]"
        else if ((function (p) {
            return p.toString() === "[object SafariRemoteNotification]";
        })(!window['safari'] || window['safari'].pushNotification)) {
            return CommonConstant.USER_AGENT_TYPE.SAFARI;
        }
        // Internet Explorer 6-11
        else if (/*@cc_on!@*/false || !!document['documentMode']) {
            isIE = true;
            return CommonConstant.USER_AGENT_TYPE.IE;
        }
        // Edge 20+
        else if (!isIE && !!window['StyleMedia']) {
            return CommonConstant.USER_AGENT_TYPE.EDGE;
        }
        else if (!window['chrome'] && !!window['chrome']['webstore']) {
            return CommonConstant.USER_AGENT_TYPE.CHROME;
        } else {
            return CommonConstant.USER_AGENT_TYPE.OTHERS;
        }
    }
}
