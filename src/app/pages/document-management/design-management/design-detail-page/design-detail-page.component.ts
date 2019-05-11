import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DesignHttpService} from '../../../../common/service/design-http.service';

@Component({
  selector: 'ngx-design-detail-page',
  templateUrl: './design-detail-page.component.html',
  styleUrls: ['./design-detail-page.component.scss'],
})
export class DesignDetailPageComponent implements OnInit {

  private designModel: any;

  private designId: any;

  public editConfig: any = {
    language: 'zh-cn',
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private designService: DesignHttpService,
  ) { }

  ngOnInit() {
    this.designId = this.activeRoute.snapshot.queryParams['designId'];
    this.getDetailDesign();
  }

  getDetailDesign() {
    this.designService.getById(this.designId).subscribe( data => {
      this.designModel = data;
    });
  }

  cancel() {
    history.back();
  }
}
