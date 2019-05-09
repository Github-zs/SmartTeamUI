import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-design-management',
  templateUrl: './design-management.component.html',
  styleUrls: ['./design-management.component.scss'],
})
export class DesignManagementComponent implements OnInit {

  private designList: Array<any>;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  add() {
    this.router.navigate(['/pages/document-management/add-design-page']);
  }
}
