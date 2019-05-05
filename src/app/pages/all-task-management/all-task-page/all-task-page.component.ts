import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TaskHttpService} from '../../../common/service/task-http.service';
import * as _ from 'lodash';
@Component({
  selector: 'ngx-all-task-page',
  templateUrl: './all-task-page.component.html',
  styleUrls: ['./all-task-page.component.scss'],
})
export class AllTaskPageComponent implements OnInit {

  public tasks: Array<any> = [];

  constructor(
    private route: Router,
    private service: TaskHttpService,
    ) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.service.selectAllTaskUrl().subscribe( data => {
      this.tasks = data;
    });
  }

  add() {
    this.route.navigate(['/pages/all-task-management/add-task-page']);
  }

}
