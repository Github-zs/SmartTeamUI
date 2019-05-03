import { Component, OnInit, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { IssueReportActionModel } from '@platform/eaf-components/common/components/issue-report-panel/model/issue-report-action.model';
import * as _ from 'lodash';

@Component({
  selector: 'issue-report-panel',
  templateUrl: './issue-report-panel.component.html',
  styleUrls: ['./issue-report-panel.component.scss']
})
export class IssueReportPanelComponent implements OnInit {

  // error page title
  @Input() title = 'Error Title';
  // error page message
  @Input() message = 'Our apologies, something went wrong.';
  // issue report actions
  @Input() issueReportActions: Array<IssueReportActionModel> = [];
  // issue report id
  @Input() issueReportId = '';
  // design issue message content template
  @Input() issueMessageContentTemplate: TemplateRef<any> = null;
  // design issue message content template
  @Input() issueReportActionToolbarTemplate: TemplateRef<any> = null;
  // on action click emit model
  @Output() emitActionClick: EventEmitter<IssueReportActionModel> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // load default button action
      if (_.isEmpty(this.issueReportActions)) {
          this.issueReportActions.unshift(new IssueReportActionModel({'key': 'Dashboard', 'name': 'Dashboard', 'iconClass': 'fa fa-home'}));
          this.issueReportActions.unshift(new IssueReportActionModel({'key': 'Email', 'name': 'Email', 'iconClass': 'fa fa-envelope-o'}));
      }
  }

  /**
   * deal action click
   * @param action issueReportActionModel
   */
  dealActionsClick(action: IssueReportActionModel) {
    this.emitActionClick.emit(action);
  }

}
