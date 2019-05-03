/**
 * Created Date: Tuesday, October 31st 2017, 2:39:22 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Injectable } from '@angular/core';
import { CommonConstant } from '@platform/common/constants/common.constant';
import { GlobalFilterModel } from '@platform/eaf-components/common/model/common/global-filter.model';
import { CommonUtilsService } from '@platform/eaf-components/common/services/common-utils.service';
import { EventsService } from '@platform/eaf-components/common/services/events.service';
import * as _ from 'lodash';

@Injectable()
export class GlobalFilterService {
    private userName: string;

    constructor(
        private commonUtilsService: CommonUtilsService,
        private eventsService: EventsService
    ) {
        this.userName = localStorage.getItem('username');
        this.initDefaultFiler();
    }

    /**
     * init global filter if filter is empty
     */
    initDefaultFiler(): void {
        this.userName = localStorage.getItem('username');
        let filter: GlobalFilterModel = JSON.parse(localStorage.getItem(this.userName + '_filter'));
        let now = this.commonUtilsService.formatDate(new Date(), 'yyyy-MM-dd');
        if (!filter) {
            const before_7_days = new Date();
            before_7_days.setDate(before_7_days.getDate() - 6);
            const before_7_daysStr = this.commonUtilsService.formatDate(
                before_7_days,
                'yyyy-MM-dd'
            );
            filter = {
                fromDate: before_7_daysStr,
                toDate: now,
                dataType: 'Last 7 Days',
                myself: true,
                group: false,
                everyone: false,
                group_selected: [],
                groupList: [],
                task_status: _.cloneDeep(
                    CommonConstant.DATAFABRIC_CONSTANTS.TASK_DEFAULT_STATUS
                ),
                workflow: [],
                due_date_status: [],
                change_items: []
            };
            this.setGlobalFilter(filter);
        } else {
            let fromDate = new Date();
            const year = fromDate.getFullYear();
            const month = fromDate.getMonth() + 1;
            const day = 1;
            let fromDateStr = year + '-' + month + '-' + day;
            switch (filter.dataType) {
                case 'Today':
                    fromDate = new Date();
                    break;
                case 'Yesterday':
                    fromDate.setDate(fromDate.getDate() - 1);
                    now = this.commonUtilsService.formatDate(
                        fromDate,
                        'yyyy-MM-dd'
                    );
                    break;
                case 'Last 7 Days':
                    fromDate.setDate(fromDate.getDate() - 6);
                    break;
                case 'Last 30 Days':
                    fromDate.setDate(fromDate.getDate() - 29);
                    break;
                case 'This Month':
                    fromDate = new Date(fromDateStr);
                    now = this.commonUtilsService.formatDate(
                        new Date(year, month, 0),
                        'yyyy-MM-dd'
                    );
                    break;
                case 'Last Month':
                    let startDate = null;
                    startDate = year + '-' + month + '-' + 1;
                    fromDate = new Date(startDate);
                    fromDate.setMonth(new Date(startDate).getMonth() - 1);
                    fromDateStr = this.commonUtilsService.formatDate(
                        fromDate,
                        'yyyy-MM-dd'
                    );
                    const endDate = new Date(year + '-' + month + '-' + 1);
                    endDate.setDate(endDate.getDate() - 1);
                    now = this.commonUtilsService.formatDate(
                        endDate,
                        'yyyy-MM-dd'
                    );
                    break;
            }
            if (filter.dataType !== 'Custom Range') {
                fromDateStr = this.commonUtilsService.formatDate(
                    fromDate,
                    'yyyy-MM-dd'
                );
                filter.fromDate = fromDateStr;
                filter.toDate = now;
                localStorage.setItem(
                    this.userName + '_filter',
                    JSON.stringify(filter)
                );
            }
        }
    }

    /**
     * get global filter from local storage
     * @returns {GlobalFilterModel} filter
     */
    getGlobalFilter(): GlobalFilterModel {
        this.userName = localStorage.getItem('username');
        const filter = JSON.parse(localStorage.getItem(this.userName + '_filter'));
        if (!filter) {
            this.initDefaultFiler();
        }
        return JSON.parse(localStorage.getItem(this.userName + '_filter'));
    }

    /**
     * set global filter from local storage
     * @param {GlobalFilterModel} filter
     * @returns void
     */
    setGlobalFilter(filter: GlobalFilterModel): void {
        localStorage.setItem(this.userName + '_filter', JSON.stringify(filter));
        setTimeout(() => {
            this.eventsService.broadcast(
                CommonConstant.DATAFABRIC_BROADCAST.GLOBAL_FILTER_CHANGE
            );
        });
    }
    /**
     * remove a global filter from local storage, if filter not null remove one filter, else remove all filter.
     * @param {GlobalFilterModel} filter
     * @returns void
     */
    removeFilter(filterItem?: string) {
        const filter: GlobalFilterModel = this.getGlobalFilter();
        const taskStatusSelected = filter.task_status;
        const workflowSelected = filter.workflow;
        if (filterItem) {
            if (_.indexOf(taskStatusSelected, filterItem) !== -1) {
                taskStatusSelected.splice(
                    _.indexOf(taskStatusSelected, filterItem),
                    1
                );
                filter.task_status = taskStatusSelected;
            } else if (_.indexOf(workflowSelected, filterItem) !== -1) {
                workflowSelected.splice(
                    _.indexOf(workflowSelected, filterItem),
                    1
                );
                filter.workflow = workflowSelected;
            }
        } else {
            filter.task_status = [];
            filter.workflow = [];
        }
        this.setGlobalFilter(filter);
    }
}
