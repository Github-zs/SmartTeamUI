import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TaskHttpService} from '../../../common/service/task-http.service';

@Component({
  selector: 'ngx-task-detail-page',
  templateUrl: './task-detail-page.component.html',
  styleUrls: ['./task-detail-page.component.scss'],
})
export class TaskDetailPageComponent implements OnInit {

  public disabled: boolean = true;

  public taskId: any;

  public taskModel: any;

  public editConfig: any = {
    language: 'zh-cn',
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private service: TaskHttpService,
  ) { }

  ngOnInit() {
    this.taskId = this.activeRoute.snapshot.queryParams['taskId'];
    this.getTaskDetail(this.taskId);
  }

  getTaskDetail(taskId) {
    this.service.selectTaskById(taskId).subscribe( data => {
      this.taskModel = data;
    });
  }

  cancel() {
    history.back();
  }

}
