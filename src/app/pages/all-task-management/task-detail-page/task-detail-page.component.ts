import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-task-detail-page',
  templateUrl: './task-detail-page.component.html',
  styleUrls: ['./task-detail-page.component.scss'],
})
export class TaskDetailPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    history.back();
  }

}
