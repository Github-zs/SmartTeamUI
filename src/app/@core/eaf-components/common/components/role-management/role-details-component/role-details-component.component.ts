/**
 * Created Date: Saturday, December 16th 2017, 07:08:49 pm
 * Author: KSC
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
    selector: 'role-details-component',
    templateUrl: './role-details-component.component.html',
    styleUrls: ['./role-details-component.component.scss', '../role-management.component.scss']
})
export class RoleDetailsComponentComponent implements OnInit {

    @Input() public detailForm: FormGroup;

    constructor() {}

    ngOnInit() {

    }
    // name should not be blank.
    removeBlanks(name) {
        let nameWithoutBlank = _.trim(this.detailForm.get(name).value);
        this.detailForm.controls[name].setValue(nameWithoutBlank);
    }
}
