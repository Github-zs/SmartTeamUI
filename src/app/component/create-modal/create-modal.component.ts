import { Component, TemplateRef, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {ProjectConstants} from "../../constants/project.constants";

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {

  public title: string = '新建类型'

  public menuList: Array<any> = [];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.initMenuList();
  }

  initMenuList() {
    this.menuList.push(ProjectConstants.menuConstants.myTasks);
    this.menuList.push(ProjectConstants.menuConstants.allTasks);
    this.menuList.push(ProjectConstants.menuConstants.requirements);
    this.menuList.push(ProjectConstants.menuConstants.designs);
    this.menuList.push(ProjectConstants.menuConstants.shares);
    this.menuList.push(ProjectConstants.menuConstants.space);
    this.menuList.push(ProjectConstants.menuConstants.resetPassword);
  }
}
