import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-add-task-page',
  templateUrl: './add-task-page.component.html',
  styleUrls: ['./add-task-page.component.scss'],
})
export class AddTaskPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    history.back();
  }
}
