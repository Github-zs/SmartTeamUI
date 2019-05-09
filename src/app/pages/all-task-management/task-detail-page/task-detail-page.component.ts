import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TaskHttpService} from '../../../common/service/task-http.service';
import {UserHttpService} from '../../../common/service/user-http.service';
import {UserModel} from '../../../common/model/user.model';

@Component({
  selector: 'ngx-task-detail-page',
  templateUrl: './task-detail-page.component.html',
  styleUrls: ['./task-detail-page.component.scss'],
})
export class TaskDetailPageComponent implements OnInit {

  public disabled: boolean = true;

  public taskId: any;

  public taskModel: any;

  public executor: UserModel = new UserModel();

  public reporter: UserModel = new UserModel();

  public editConfig: any = {
    language: 'zh-cn',
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private service: TaskHttpService,
    private userService: UserHttpService,
  ) { }

  ngOnInit() {
    this.taskId = this.activeRoute.snapshot.queryParams['taskId'];
    this.getTaskDetail(this.taskId);
  }

  getTaskDetail(taskId) {
    this.service.selectTaskById(taskId).subscribe( data => {
      this.taskModel = data;
      this.userService.getUserById(data.taskExecutor).subscribe( executor => {
        this.executor = executor;
      });
      this.userService.getUserById(data.taskReporter).subscribe( reporter => {
        this.reporter = reporter;
      });
    });
  }

  cancel() {
    history.back();
  }

}
