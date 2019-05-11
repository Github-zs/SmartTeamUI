import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShareHttpService} from '../../../common/service/share-http.service';

@Component({
  selector: 'ngx-share-detail-page',
  templateUrl: './share-detail-page.component.html',
  styleUrls: ['./share-detail-page.component.scss']
})
export class ShareDetailPageComponent implements OnInit {

  private shareModel: any;

  private shareId: any;

  public editConfig: any = {
    language: 'zh-cn',
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private shareService: ShareHttpService,
  ) { }

  ngOnInit() {
    this.shareId = this.activeRoute.snapshot.queryParams['shareId'];
    this.getShareDetail();
  }

  getShareDetail() {
    this.shareService.getById(this.shareId).subscribe( data => {
      this.shareModel = data;
    });
  }

  cancel() {
    history.back();
  }

}
