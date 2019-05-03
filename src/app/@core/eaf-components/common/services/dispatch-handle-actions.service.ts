/**
 * Created Date: Saturday, July 8th 2017, 8:02:33 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { IssueReportActionModel } from '@platform/eaf-components/common/components/issue-report-panel/model/issue-report-action.model';
import { DispatcherHandleActionsInterface } from '@platform/eaf-components/common/services/dispatcher-handle-actions.interface';

@Injectable()
export class DispatchHandleActionsService implements DispatcherHandleActionsInterface {
    static DASHBOARD_URL = '/admin/dashboard';
    constructor(public router: Router, public translate: TranslateService) { }

    dealErrorCases(event: IssueReportActionModel, issueReportId?: string, title?: string) {
        switch (event.key) {
            case 'Email':
                this.createEmailTemplate('', '', issueReportId, title);
                break;
            case 'Dashboard':
                this.navigateToDashboard();
                break;
            default:
                break;
        }
    }

    createEmailTemplate(mailTo: string, platformName: string, issueId: string, notification: string) {
        mailTo = mailTo || this.translate.instant('EXCEPTION_SEND_TO_MAIL');
        const subject = this.translate.instant('EXCEPTION_SUBJECT_TEMPLATE', {
            platformName: platformName ? platformName : 'Platform',
            issueId: issueId,
            notification: notification
        });
        const body =  this.translate.instant('EXCEPTION_BODY_TEMPLATE', {
            issueId: issueId
        });
        location.href = this.translate.instant('EXCEPTION_MAIL_LINK_TEMPLATE', {
            mailTo: mailTo,
            subject: subject,
            body: body
        });
    }

    navigateToDashboard() {
        this.router.navigate([DispatchHandleActionsService.DASHBOARD_URL]);
    }
}
