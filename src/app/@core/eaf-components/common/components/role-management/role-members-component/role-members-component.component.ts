/**
 * Created Date: Saturday, December 16th 2017, 07:08:49 pm
 * Author: KSC
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */

import { AfterViewInit, Component, DoCheck, Input, IterableDiffer, IterableDiffers, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DatatableContainerBaseComponent } from '@platform/eaf-components/common/components/datatable-container-base.component';
import { AdministrationService } from '@platform/eaf-components/common/services/administration.service';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';

@Component({
    selector: 'role-members-component',
    templateUrl: './role-members-component.component.html',
    styleUrls: [
        './role-members-component.component.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class RoleMembersComponentComponent extends DatatableContainerBaseComponent implements OnInit, AfterViewInit, DoCheck {
    @Input() public userList: FormArray;
    @ViewChild(DataTableDirective)
    public dtElement: DataTableDirective;
    // datatable settings
    public dtOptions: DataTables.Settings;
    // datatable trigger
    public dtTrigger: Subject<any> = new Subject();
    // datatable data driven model
    public tableData: Array<any> = [];
    // detect FormArray changes.
    public iterableDiffer: IterableDiffer<any>;
    // when hover to user's last name,
    public currentHoverObj: any = null; // {currentHoverUser: {}, currentHoverPersonL: {}};
    public positionX: string = null;
    public positionY: string = null;
    initFinished = false;
    constructor(private _iterableDiffers: IterableDiffers, private adminService: AdministrationService) {
        super();
        this.iterableDiffer = this._iterableDiffers.find([]).create(null);
        this.adminService.categorieKeys = [
            'STATE_PROVINCE_DATA',
            'COUNTRY_DATA'
        ];
    }

    ngOnInit() {
        this.adminService.prepareReferenceData().then(() => {
            this.dtOptions = {
                autoWidth: false,
                retrieve: true,
                searching: false,
                ordering: true,
                paging: true,
                lengthChange: true,
                pageLength: 10,
                lengthMenu: [10, 25, 50, 100],
                info: false,
                scrollX: true,
                columnDefs: [
                    {
                        defaultContent: '',
                        targets: [0]
                    },
                    {
                        defaultContent: '',
                        targets: [1]
                    },
                    {
                        defaultContent: '',
                        targets: [2]
                    },
                    {
                        defaultContent: '',
                        targets: [3]
                    },
                ],
                language: {
                    lengthMenu: '_MENU_',
                },
                dom:
                    't<"bottom col-xs-12 none-horizontal-padding"<"col-xs-12 col-md-8 none-horizontal-padding"p><"col-xs-12 col-md-4 none-horizontal-padding"l>><"clear">'
            };
        });
    }

    ngAfterViewInit() {
        this.dtTrigger.next();
    }

    ngDoCheck() {
        const changes = this.iterableDiffer.diff(this.userList.value);
        if (changes) {
            this.currentHoverObj = null;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                // Destroy the table first
                dtInstance.destroy();
                // Call the dtTrigger to rerender again
                this.tableData.splice(0, this.tableData.length);
                this.tableData = changes['collection'];
                this.dtTrigger.next();
                // dtInstance.columns.adjust();
              });
        }
    }

    openUserPopover(event, user) {
        this.adminService.getHoverObject(user).subscribe(res => {
            const person = res;
            this.positionX = (parseInt(event.clientX, 10) + 30).toString() + 'px';
            this.positionY = (event.clientY).toString() + 'px';
            this.currentHoverObj = this.adminService.getFullProfileCard(person, user);
        });
    }

    closePopover() {
        this.currentHoverObj = null;
    }

    formatDate(date){
        let res = '';
        if(date){
            res = moment.utc(date).format('YYYY-MM-DD');
        }
        return res;
    }
}
