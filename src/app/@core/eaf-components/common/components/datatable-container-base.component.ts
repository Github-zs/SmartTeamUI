/**
 * Created Date: Tuesday, December 5th 2017, 2:10:55 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { ViewChild, HostListener } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import * as _ from 'lodash';

export class DatatableContainerBaseComponent {

    @ViewChild(DataTableDirective)
    protected _datatableElement: DataTableDirective;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (!_.isEmpty(this._datatableElement) && !_.isEmpty(this._datatableElement.dtInstance)) {
            this._datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.draw()
            });
        }
    }
}
