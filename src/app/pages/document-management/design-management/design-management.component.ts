import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DesignHttpService} from '../../../common/service/design-http.service';

@Component({
  selector: 'ngx-design-management',
  templateUrl: './design-management.component.html',
  styleUrls: ['./design-management.component.scss'],
})
export class DesignManagementComponent implements OnInit {

  private designList: Array<any>;

  constructor(
    private router: Router,
    private service: DesignHttpService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe( data => {
      this.designList = data;
    });
  }

  add() {
    this.router.navigate(['/pages/document-management/add-design-page']);
  }
}
