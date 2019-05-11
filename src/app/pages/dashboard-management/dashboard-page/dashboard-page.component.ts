import { Component, OnInit } from '@angular/core';
import {ShareHttpService} from '../../../common/service/share-http.service';
import {DesignHttpService} from '../../../common/service/design-http.service';
import {RequirementHttpService} from '../../../common/service/requirement-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {

  private shareList: Array<any> = [];

  private designList: Array<any> = [];

  private requirementList: Array<any> = [];

  constructor(
    private shareService: ShareHttpService,
    private designService: DesignHttpService,
    private requirementService: RequirementHttpService,
  ) { }

  ngOnInit() {
    this.getAllDocument();
  }

  getAllDocument() {
    this.shareService.getByAuthor().subscribe( data => {
      this.shareList = data;
    });
    this.designService.getByAuthor().subscribe( data => {
      this.designList = data;
    });
    this.requirementService.getByAuthor().subscribe( data => {
      this.requirementList = data;
    });
  }

  deleteShare(shareId) {
    if (confirm('确认删除吗？')) {
      this.shareService.delete(shareId).subscribe( data => {
        location.reload();
      });
    }
  }

  deleteDesign(designId) {
    if (confirm('确认删除吗？'))　{
      this.designService.delete(designId).subscribe( data => {
        location.reload();
      });
    }
  }

  deleteRequirement(requirementId) {
    if (confirm('确认删除吗？')) {
      this.requirementService.delete(requirementId).subscribe( data => {
        location.reload();
      });
    }
  }
}
