/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {
    AfterViewInit,
    Component,
    DoCheck,
    Input,
    IterableDiffer,
    IterableDiffers,
    OnInit,
    ViewChild, ViewEncapsulation
} from '@angular/core';
import { DatatableContainerBaseComponent } from '@platform/eaf-components/common/components/datatable-container-base.component';
import { AddMembersSearchModalComponent } from '@platform/eaf-components/common/components/group-management/components/add-members-search-modal.component';
import { MarkSupervisorModalComponent } from '@platform/eaf-components/common/components/group-management/components/mark-supervisor-modal.component';
import { RemoveUserConfirmModalComponent } from '@platform/eaf-components/common/components/group-management/components/remove-user-confirm-modal.component';
import { AdministrationService } from '@platform/eaf-components/common/services/administration.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';

@Component({
    selector: 'group-members-component',
    styleUrls: ['../../group-management.component.scss'],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div id="group-management" *ngIf="canPersist">
            <button class="btn btn-default margin-left-6 margin-top-minus-6"
                    type="button" (click)="openUserSearchModal()"
            >{{"WORKFLOW_MANAGEMENT_ADD" | translate}}
            </button>
        </div>
        <div class="spbrow" [hidden]="!selectedGroup.userList || selectedGroup.userList.length === 0">
            <table datatable [dtOptions]="membersDtOptions" [dtTrigger]="membersDtTrigger"
                   class="group-members-table table table-hover order-column table-condensed table-striped datafab-table-hover">
                <thead>
                <tr>
                    <th class="text-center no-sorting">{{"GROUP_MANAGEMENT_SUPERVISOR" | translate}}</th>
                    <th class="text-center">{{"NATURAL_PERSON_LAST_NAME" | translate}}</th>
                    <th class="text-center">{{"NATURAL_PERSON_FIRST_NAME" | translate}}</th>
                    <th class="text-center">{{"PROFILE_EMAIL" | translate}}</th>
                    <th class="text-center no-sorting">
                        {{"SEARCH_QUERY_SUBSCRIPTION_QUERY_ACCOUNT_STATUS" | translate}}
                    </th>
                    <th class="text-center">{{"SEARCH_QUERY_SUBSCRIPTION_QUERY_EFFECTIVE_DATE" | translate}}</th>
                    <th class="text-center no-sorting" *ngIf="canPersist">{{"RESEARCH_FINDING_ACTION" | translate}}</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let user of tableData">
                    <td class="text-center">
                        <input type="checkbox" [(ngModel)]="user.isSupervisor"
                               (ngModelChange)="openMarkSupervisorModal(user)"
                               [disabled]="!canPersist || !canSupervise"/>
                    </td>
                    <td class="text-center" (mouseenter)="openUserPopover($event, user)">
                        <span>{{user.lastName}}</span>
                    </td>
                    <td class="text-center">
                        <span>{{user.firstName}}</span>
                    </td>
                    <td class="text-center">{{user.email}}</td>
                    <td class="text-center">
                        {{user.accountStatusName}}
                    </td>
                    <td class="text-center">
                        <span
                            *ngIf="user.userDetailModel&&user.userDetailModel.effectiveDate">{{formatDate(user.userDetailModel.effectiveDate)}}</span>
                    </td>
                    <td class="text-center" *ngIf="canPersist">
                        <span class="btn" (click)="removeUserFromGroup(user)">
                            <i class="fa fa-minus-circle" aria-hidden="true"
                               title="{{'GROUP_MANAGEMENT_REMOVE_USER' | translate}}"></i>
                        </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <profile-card *ngIf="currentHoverObj" class="user-profile-popover" (closePopover)="closePopover()"
                      [positionY]="positionY" [positionX]="positionX"
                      [currentHoverObj]="currentHoverObj"></profile-card>
    `
})

export class GroupMembersComponent extends DatatableContainerBaseComponent implements OnInit, AfterViewInit, DoCheck {
    @Input() selectedGroup;
    @Input() canPersist = false;
    @Input() canSupervise = false;
    /**
     * mark supervisor confirm modal
     */
    public modalRef: BsModalRef;

    // when hover to user's last name,
    public currentHoverObj: any = null; // {currentHoverUser: {}, currentHoverPersonL: {}};
    public positionX: string = null;
    public positionY: string = null;
    /**
     * remove user confirm modal ref
     */
    public removeUserConfirmModalRef: BsModalRef;

    private _membersDtOptions: CustomDataTableSetting;
    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    private _membersDtTrigger: Subject<any> = new Subject();

    // modal config.
    public config_lg = {
        animated: true,
        keyboard: false,
        backdrop: 'static',
        ignoreBackdropClick: true,
        class: 'modal-lg',
    };
    // modal config.
    public config = {
        animated: true,
        keyboard: false,
        backdrop: true,
        ignoreBackdropClick: true
    };

    // detect FormArray changes.
    public iterableDiffer: IterableDiffer<any>;
    @ViewChild(DataTableDirective)
    public dtElement: DataTableDirective;

    // datatable data driven model
    public tableData: Array<any> = [];

    public get membersDtOptions(): CustomDataTableSetting {
        return this._membersDtOptions;
    }

    public set membersDtOptions(value: CustomDataTableSetting) {
        this._membersDtOptions = value;
    }

    public get membersDtTrigger(): Subject<any> {
        return this._membersDtTrigger;
    }

    public set membersDtTrigger(value: Subject<any>) {
        this._membersDtTrigger = value;
    }

    constructor(private modalService: BsModalService,
                private _iterableDiffers: IterableDiffers,
                private adminService: AdministrationService) {
        super();
        this.iterableDiffer = this._iterableDiffers.find([]).create(null);
        this.adminService.categorieKeys = [
            'STATE_PROVINCE_DATA',
            'COUNTRY_DATA'
        ];
        this.membersDtOptions = {
            retrieve: true,
            searching: false,
            autoWidth: true,
            scrollCollapse: true,
            info: false,
            order: [],
            language: {
                lengthMenu: '_MENU_'
            },
            dom:
                '<"top"i>rt<"bottom col-xs-12 none-horizontal-padding"<"col-xs-12 col-md-6 none-horizontal-padding"p><"col-xs-12 col-md-6 none-horizontal-padding"fl>><"clear">'
        };
    }

    public openUserSearchModal() {
        this.modalService.show(AddMembersSearchModalComponent, this.config_lg);
        const modalOnHide: Subscription = this.modalService.onHide.subscribe(res => {
            const newList = [];
            const resultList = JSON.parse(res);
            _.forEach(resultList, (user: any) => {
                if (!_.find(this.selectedGroup.userList, {userId: _.parseInt(user.userId)})) {
                    newList.push(this.constructUserObject(user.user));
                }
            });
            if (this.selectedGroup) {
                if (!this.selectedGroup.userList) {
                    this.selectedGroup.userList = [];
                }
                this.selectedGroup.userList = this.selectedGroup.userList.concat(newList);
            }
            modalOnHide.unsubscribe();
        });
    }

    /**
     * constructUserObject for save
     *
     * @private
     * @param {object} user
     * @returns
     * @memberof GroupMembersComponent
     */
    private constructUserObject(user: object) {
        if (user) {
            _.forEach(_.keys(user), (key) => {
                if (user[key] == null || typeof(user[key]) === 'object') {
                    delete user[key];
                }
            });
            // set user status manually
            if (user['isActive']) {
                user['accountStatusName'] = 'Active';
            } else {
                user['accountStatusName'] = 'Inactive';
            }
        }
        return user;
    }

    ngOnInit() {
        this.adminService.prepareReferenceData().then(() => {

        });
    }


    ngAfterViewInit() {
        this.membersDtTrigger.next();
    }

    ngDoCheck() {
        const changes = this.iterableDiffer.diff(this.selectedGroup.userList);
        if (changes) {
            this.currentHoverObj = null;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                // Destroy the table first
                dtInstance.destroy();
                // Call the dtTrigger to rerender again
                this.tableData = changes['collection'];
                this.membersDtTrigger.next();
            });
        }
    }

    /**
     * open Mark Supervisor Modal
     * @param user
     * @param template
     */
    openMarkSupervisorModal(user) {
        if (user.isSupervisor) {
            const modalOnHide: Subscription = this.modalService.onHide.subscribe(response => {
                _.forEach(this.selectedGroup.userList, (sourceUser) => {
                    if (sourceUser.userId === _.parseInt(user.userId)) {
                        sourceUser.isSupervisor = response && response === 'true' ? true : false;
                        return;
                    }
                });
                modalOnHide.unsubscribe();
            });
            this.modalRef = this.modalService.show(MarkSupervisorModalComponent, this.config);
            this.modalRef.content.user = user;
        } else {
            _.forEach(this.selectedGroup.userList, (sourceUser) => {
                if (sourceUser.userId === _.parseInt(user.userId)) {
                    sourceUser.isSupervisor = false;
                    return;
                }
            });
        }
    }

    /**
     * remove user from group member list
     * @param user
     */
    removeUserFromGroup(user) {
        const modalOnHide: Subscription = this.modalService.onHide.subscribe(isRemoved => {
            if (isRemoved && isRemoved === 'true') {
                const index = _.findIndex(this.selectedGroup.userList, {'userId': user.userId});
                this.selectedGroup.userList.splice(index, 1);
                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    // Destroy the table first
                    dtInstance.destroy();
                    this.membersDtTrigger.next();
                    this.tableData = this.selectedGroup.userList;
                });
            }
            modalOnHide.unsubscribe();
        });
        this.removeUserConfirmModalRef = this.modalService.show(RemoveUserConfirmModalComponent, this.config);
        this.removeUserConfirmModalRef.content.user = user;
        this.removeUserConfirmModalRef.content.userList = this.selectedGroup.userList;
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

    formatDate(date) {
        let res = '';
        if (date) {
            res = moment.utc(date).format('YYYY-MM-DD');
        }
        return res;
    }

}
