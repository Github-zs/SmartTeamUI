import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-design-management',
  templateUrl: './design-management.component.html',
  styleUrls: ['./design-management.component.scss'],
})
export class DesignManagementComponent implements OnInit {

  private designList: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
