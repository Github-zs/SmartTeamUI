/**
 * Created Date: Saturday, December 16th 2017, 07:08:49 pm
 * Author: KSC
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'role-groups-component',
  templateUrl: './role-groups-component.component.html',
  styleUrls: ['./role-groups-component.component.scss', '../role-management.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoleGroupsComponentComponent implements OnInit {
  @Input() public groupList: FormArray;

  constructor() { }

  ngOnInit() {
  }

   // as a work around for display FormArray we must manually create the getter function.
  /*  get groupList(): FormArray {
    return this.groupsForm.get('groupList') as FormArray;
} */
}
