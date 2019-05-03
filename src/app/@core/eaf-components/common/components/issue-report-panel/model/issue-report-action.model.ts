/**
 * issue report action model
 */
export class IssueReportActionModel {
    key: string;
    name: string;
    iconClass: string;
    constructor(issueReportActionModel ?: any) {
        issueReportActionModel = issueReportActionModel || {};
        this.key = issueReportActionModel.key;
        this.name = issueReportActionModel.name;
        this.iconClass = issueReportActionModel.iconClass;
    }
}
