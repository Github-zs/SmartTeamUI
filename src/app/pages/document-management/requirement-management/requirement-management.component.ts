import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-requirement-management',
  templateUrl: './requirement-management.component.html',
  styleUrls: ['./requirement-management.component.scss'],
})
export class RequirementManagementComponent implements OnInit {

  private requirementList: Array<any>;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  add() {
    this.router.navigate(['/pages/document-management/add-requirement-page']);
  }
}
