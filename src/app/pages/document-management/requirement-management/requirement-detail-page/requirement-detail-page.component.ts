import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequirementHttpService} from '../../../../common/service/requirement-http.service';

@Component({
  selector: 'ngx-requirement-detail-page',
  templateUrl: './requirement-detail-page.component.html',
  styleUrls: ['./requirement-detail-page.component.scss'],
})
export class RequirementDetailPageComponent implements OnInit {

  private requirementModel: any;

  private requirementId: any;

  public editConfig: any = {
    language: 'zh-cn',
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private requirementService: RequirementHttpService,
  ) { }

  ngOnInit() {
    this.requirementId = this.activeRoute.snapshot.queryParams['requirementId'];
    this.getDetailRequirement();
  }

  getDetailRequirement() {
    this.requirementService.getById(this.requirementId).subscribe( data => {
      this.requirementModel = data;
    });
  }

  cancel() {
    history.back();
  }
}
