/**
 * Created Date: Saturday, July 8th 2018
 * Author: KSC
 * This interface is designed to manage their reference data or low frequency updated data through whole project.
 * User can maintain an key-value object and update them regularly from API calls.
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */
import { InjectionToken } from '@angular/core';
import { IssueReportActionModel } from '@platform/eaf-components/common/components/issue-report-panel/model/issue-report-action.model';


export const DISPATCH_HANDLE_ACTIONS_TOKEN = new InjectionToken<DispatcherHandleActionsInterface>('DispatcherHandleActionsInterface.Impl');

export interface DispatcherHandleActionsInterface {

    dealErrorCases(event: IssueReportActionModel, issueReportId?: string);

    createEmailTemplate(mailTo: string, platformName: string, issueId: string, notification: string);

    navigateToDashboard();
}
