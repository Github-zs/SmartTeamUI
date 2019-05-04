import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-all-task-page',
  templateUrl: './all-task-page.component.html',
  styleUrls: ['./all-task-page.component.scss'],
})
export class AllTaskPageComponent implements OnInit {

  public tasks: Array<any> = [
    {
      title: 'Test1',
      group: 'EHM',
      url: 'EHM-10',
    },
    {
      title: 'Test2',
      group: 'QC',
      url: 'EHM-11',
    },
    {
      title: 'Test3',
      group: 'Korgor',
      url: 'EHM-12',
    },
    {
      title: 'Test4',
      group: 'Support',
      url: 'EHM-13',
    },
  ];

  constructor(private route: Router) { }

  ngOnInit() {
  }

  add() {
    this.route.navigate(['/pages/all-task-management/add-task-page']);
  }

}
