import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-task-detail-page',
  templateUrl: './task-detail-page.component.html',
  styleUrls: ['./task-detail-page.component.scss'],
})
export class TaskDetailPageComponent implements OnInit {

  public disabled: boolean = true;

  public editConfig: any = {
    language: 'zh-cn',
  };

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    history.back();
  }

}
