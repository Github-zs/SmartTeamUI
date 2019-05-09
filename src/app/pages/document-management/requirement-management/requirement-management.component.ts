import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RequirementHttpService} from '../../../common/service/requirement-http.service';

@Component({
  selector: 'ngx-requirement-management',
  templateUrl: './requirement-management.component.html',
  styleUrls: ['./requirement-management.component.scss'],
})
export class RequirementManagementComponent implements OnInit {

  private requirementList: Array<any>;

  constructor(
    private router: Router,
    private service: RequirementHttpService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe( data => {
      this.requirementList = data;
    });
  }

  add() {
    this.router.navigate(['/pages/document-management/add-requirement-page']);
  }
}
