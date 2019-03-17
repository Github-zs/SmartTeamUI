import { Component, OnInit } from '@angular/core';
import {ProjectConstants} from "../../../constants/project.constants";

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss']
})
export class MenuLeftComponent implements OnInit {

  public menuList: Array<any> = [];

  constructor() { }

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
