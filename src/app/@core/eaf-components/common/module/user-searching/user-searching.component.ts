/**
 * Created Date: Friday, December 15th 2017, 03:23:11 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IsInactiveFilterOptionModel } from '@platform/advance-components/ksc-advance-search-form/is-inactive-filter-option.model';
import { KSCAdvanceSearchFormConditionModel } from '@platform/advance-components/ksc-advance-search-form/ksc-advance-search-form-condition.model';
import { KSCAdvanceSearchFormComponent } from '@platform/advance-components/ksc-advance-search-form/ksc-advance-search-form.component';
import { KSCAdvanceSearchFormModel } from '@platform/advance-components/ksc-advance-search-form/ksc-advance-search-form.model';
import { KSCAdvanceSearchResultFacetModel } from '@platform/advance-components/ksc-advance-search-result/ksc-advance-search-result-facet.model';
import { KSCAdvanceSearchResultSelectpickerModel } from '@platform/advance-components/ksc-advance-search-result/ksc-advance-search-result-selectpicker.model';
import { KSCAdvanceSearchResultComponent } from '@platform/advance-components/ksc-advance-search-result/ksc-advance-search-result.component';
import { Ng4LoadingSpinnerService } from '@platform/basic-components/ng4-loading-spinner/ng4LoadingSpinner.service';
import { Permission } from '@platform/common/constants/permissions.eum';
import { Path } from '@platform/common/constants/url.path.contant';
import { CommonUtils } from '@platform/common/util/common-utils';
import { UserSearchingService } from '@platform/eaf-components/common/module/user-searching/user-searching.service';
import { UserHttpService } from '@platform/eaf-components/common/services/http/user-http.service';
import { SearchFormHelperService } from '@platform/eaf-components/common/services/search-form-helper.service';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
    selector: 'user-searching',
    templateUrl: './user-searching.component.html',
    styleUrls: ['./user-searching.component.scss']
})
export class UserSearchingComponent implements OnInit {

    public modalRef: BsModalRef;
    @ViewChild(KSCAdvanceSearchFormComponent)
    searchFormComponent: KSCAdvanceSearchFormComponent;
    @Input() task: any;
    @Input() searchInput: string = '';
    @Input() showFacetsAndFilters: boolean = true;
    @Input() showSearchForm: boolean = true;
    @Input() showSearchResult: boolean = true;
    @Input() hideFilterButton: boolean = false;
    @Input() showSelectPicker: boolean = true;
    @Input() addedCollaboratorIdList: Array<any> = [];
    private _showInactiveFilter: boolean;
    private searchResultTableScrollY: string = '300px';
    Permission = Permission;
    private _domain: string;
    private _shownDataSource: boolean = false;
    // Default max filter condition to 5
    private _filterNumber: number = 5;
    private _filterConfigs: Array<KSCAdvanceSearchFormConditionModel>;
    private _groups: Array<object>;
    private _roles: Array<object>;
    // Define search result show columns dropdown list
    private _selectConfig: KSCAdvanceSearchResultSelectpickerModel;
    // Define search result facet
    private _facetArray: Array<KSCAdvanceSearchResultFacetModel>;
    // Define search result table settings
    private _dtOptions: DataTables.Settings;
    // Define header info list
    private _header: Array<object>;
    // Define search condgions
    private _searchConditions: KSCAdvanceSearchFormModel;
    // Define facets filter
    private _facetsFilter: object = {};
    // Define default show columns (index)
    private _defaultShowColumns: Array<number>;
    private _optionalFilter: object;
    private _showFacets: boolean;
    private _selectedUsers: object = {};
    private _isCheckedAll: boolean = false;
    private _queryParams: object;
    private _recordsTotal: number;
    private _searchValue: string;
    private _hideAddButton: boolean = false;
    public lastFilterType: string;
    public isInactiveFilterOption: IsInactiveFilterOptionModel = new IsInactiveFilterOptionModel();

    @Output() rowClick: EventEmitter<any> = new EventEmitter();

    @Output() selectedRows: EventEmitter<object> = new EventEmitter();

    @Output() reloadDtData: EventEmitter<object> = new EventEmitter();

    @ViewChild(KSCAdvanceSearchResultComponent)
    dtComponent: KSCAdvanceSearchResultComponent;

    public get hideAddButton(): boolean {
        return this._hideAddButton;
    }

    @Input('hideAddButton')
    public set hideAddButton(value: boolean) {
        this._hideAddButton = value;
    }

    public get shownDataSource(): boolean {
        return this._shownDataSource;
    }

    public set shownDataSource(value: boolean) {
        this._shownDataSource = value;
    }

    public get filterNumber(): number {
        return this._filterNumber;
    }

    public set filterNumber(value: number) {
        this._filterNumber = value;
    }

    public get filterConfigs(): Array<KSCAdvanceSearchFormConditionModel> {
        return this._filterConfigs;
    }

    public set filterConfigs(value: Array<KSCAdvanceSearchFormConditionModel>) {
        this._filterConfigs = value;
    }

    public get domain(): string {
        return this._domain;
    }

    @Input('domain')
    public set domain(value: string) {
        this._domain = value;
    }

    public get groups(): Array<object> {
        return this._groups;
    }

    public set groups(value: Array<object>) {
        this._groups = value;
    }

    public get roles(): Array<object> {
        return this._roles;
    }

    public set roles(value: Array<object>) {
        this._roles = value;
    }

    public get selectConfig(): KSCAdvanceSearchResultSelectpickerModel {
        return this._selectConfig;
    }

    public set selectConfig(value: KSCAdvanceSearchResultSelectpickerModel) {
        this._selectConfig = value;
    }

    public get facetArray(): Array<KSCAdvanceSearchResultFacetModel> {
        return this._facetArray;
    }

    public set facetArray(value: Array<KSCAdvanceSearchResultFacetModel>) {
        this._facetArray = value;
    }

    public get dtOptions(): DataTables.Settings {
        return this._dtOptions;
    }

    public set dtOptions(value: DataTables.Settings) {
        this._dtOptions = value;
    }

    public get header(): Array<object> {
        return this._header;
    }

    public set header(value: Array<object>) {
        this._header = value;
    }

    public get searchConditions(): KSCAdvanceSearchFormModel {
        return this._searchConditions;
    }

    public set searchConditions(value: KSCAdvanceSearchFormModel) {
        this._searchConditions = value;
    }

    public get facetsFilter(): object {
        return this._facetsFilter;
    }

    public set facetsFilter(value: object) {
        this._facetsFilter = value;
    }

    public get defaultShowColumns(): Array<number> {
        return this._defaultShowColumns;
    }

    public set defaultShowColumns(value: Array<number>) {
        this._defaultShowColumns = value;
    }

    public get optionalFilter(): object {
        return this._optionalFilter;
    }

    public set optionalFilter(value: object) {
        this._optionalFilter = value;
    }

    public get showFacets(): boolean {
        return this._showFacets;
    }

    public set showFacets(value: boolean) {
        this._showFacets = value;
    }

    public get isCheckedAll(): boolean {
        return this._isCheckedAll;
    }

    public set isCheckedAll(value: boolean) {
        this._isCheckedAll = value;
    }

    public get selectedUsers(): object {
        return this._selectedUsers;
    }

    public set selectedUsers(value: object) {
        this._selectedUsers = value;
    }

    public get queryParams(): object {
        return this._queryParams;
    }

    public set queryParams(value: object) {
        this._queryParams = value;
    }

    public get recordsTotal(): number {
        return this._recordsTotal;
    }

    public set recordsTotal(value: number) {
        this._recordsTotal = value;
    }

    public get searchValue(): string {
        return this._searchValue;
    }

    public set searchValue(value: string) {
        this._searchValue = value;
    }


    get showInactiveFilter(): boolean {
        return this._showInactiveFilter;
    }

    @Input('showInactiveFilter')
    set showInactiveFilter(value: boolean) {
        this._showInactiveFilter = value;
        this.isInactiveFilterOption.enable = value;
    }

    constructor(
        private el: ElementRef,
        private _userHttpService: UserHttpService,
        private _userSearchingService: UserSearchingService,
        private _changeDetectorRef: ChangeDetectorRef,
        private spinnerService: Ng4LoadingSpinnerService,
        private routeInfo: ActivatedRoute,
        private searchFormHelperService: SearchFormHelperService,
        private toastrService: ToastrService,
        private router: Router
    ) {}

    /**
     * initial filter config
     *
     * @author edqin
     * @memberof NaturalPersonSearchComponent
     */
    public initialSearchFilterConfigs() {
        this._userHttpService
            .getAllGroups('?strIncludeInactive=true')
            .subscribe(res => {
                    this.groups = res;
                    this._userHttpService
                        .getAllRoles('?strIncludeInactive=true')
                        .subscribe(res => {
                                setTimeout(_ => {this.spinnerService.hide(); });
                                this.roles = res;
                                this._userSearchingService.constructSearchFilterConfigs(
                                    this.groups,
                                    this.roles
                                ).then(filterConfigs => {
                                    this.filterConfigs = filterConfigs;
                                });
                            },
                            error => {
                                setTimeout(_ => {this.spinnerService.hide(); });
                            });
                },
                error => {
                    setTimeout(_ => {this.spinnerService.hide(); });
                }
            );
    }

    public initialTableData() {
        this._userSearchingService.constructorDtColumns(
            this.domain
        ).then((columnsObj: any) => {
            this.selectConfig = this._userSearchingService.constructSelectConfiguration(
                columnsObj.allColumns
            );
            this.defaultShowColumns = columnsObj.defaultColumns;
            this.dtOptions = {
                processing: true,
                searching: false,
                autoWidth: true,
                scrollX: true,
                scrollY: this.searchResultTableScrollY,
                serverSide: true,
                order: [],
                lengthMenu: [10, 20, 50, 100],
                language: {
                    lengthMenu: '_MENU_'
                },
                dom:
                    '<"top"i>rt<"bottom col-xs-12 none-horizontal-padding"<"col-xs-12 col-md-6 none-horizontal-padding"p><"col-xs-12 col-md-6 none-horizontal-padding"fl>><"clear">',
                ajax: (data, callback, settings) => {
                    if (this.domain === 'remove_collaborator') {
                        this.reloadDtData.emit({
                            settings: settings,
                            callback: callback
                        });
                        this._showFacets = true;
                    } else {
                        this.queryParams = this._userSearchingService.constructorQueryparams(
                            this.searchConditions,
                            this.facetsFilter,
                            settings
                        );
                        this._userHttpService.searchUserManagementWithPagination(this.queryParams).subscribe((res: any) => {
                            this._userSearchingService.constructSearchResultData(
                                res
                            ).then(resultData => {
                                if (!_.isEmpty(resultData)) {
                                    this._showFacets = true;
                                }
                                this._userSearchingService.constructFacetsResult(
                                    res.facetsResult,
                                    this.lastFilterType,
                                    this.roles,
                                    this.groups
                                ).then(facetArray => {
                                    this.facetArray = facetArray;
                                    this._changeDetectorRef.detectChanges();
                                    this.recordsTotal = res.found;
                                    setTimeout(_ => {
                                        this.spinnerService.hide();
                                    });
                                    callback({
                                        recordsTotal: res.found,
                                        recordsFiltered: res.found,
                                        data: resultData
                                    });
                                });
                            });
                        }, (errMsg) => {
                            this.toastrService.error(errMsg.error.errorMessage);
                            setTimeout(_ => {
                                this.spinnerService.hide();
                            });
                            callback({
                                recordsTotal: 0,
                                recordsFiltered: 0,
                                data: []
                            });
                        });
                    }
                },
                columns: columnsObj.allColumns,
                columnDefs: [
                    {
                        targets: columnsObj.visibleColumns,
                        visible: true
                    },
                    {
                        targets: '_all',
                        visible: false
                    }
                ],
                rowCallback: (row: Node, data: any, index: number) => {
                    const self = this;
                    // Unbind first in order to avoid any duplicate handler
                    // (see https://github.com/l-lin/angular-datatables/issues/87)
                    if (_.isEqual(self.domain, 'add_item')) {
                        if (
                            _.keys(self.selectedUsers).indexOf(
                                _.toString(data.userId)
                            ) > -1
                        ) {
                            $('td input#checkbox-row', row).prop('checked', true);
                        }
                        $('th input#checkbox-header').unbind('click');
                        $('th input#checkbox-header').bind('click', (e: any) => {
                            self.checkboxHeaderChange(e.target.checked);
                        });
                        $('td input#checkbox-row', row).unbind('click');
                        $('td input#checkbox-row', row).bind('click', (e: any) => {
                            self.checkboxRowChange(e.target.checked, data);
                        });
                    } else {

                        if (this.domain === 'select_collaborator' && this.task.taskCollaborators && this.task.taskCollaborators.length !== 0) {
                            _.forEach(this.task.taskCollaborators, (value) => {
                                if (value.userId === data.userId) {
                                    $('td button#viewRow-add-collaborator', row).css('background-color', '#ccc');
                                    $('td button#viewRow-add-collaborator', row).attr('disabled', 'disabled');
                                }
                            });
                        }

                        $('td a#viewRow', row).unbind('click');
                        $('td a#viewRow', row).bind('click', () => {
                            self.rowClick.emit({ type: 'action', data: data });
                        });

                        $('td button#viewRow-add-collaborator', row).unbind('click');
                        $('td button#viewRow-add-collaborator', row).bind('click', () => {
                            self.rowClick.emit({
                                task: this.task,
                                user: data
                            });
                        });

                        $('td button#viewRow-remove-collaborator', row).unbind('click');
                        $('td button#viewRow-remove-collaborator', row).bind('click', () => {
                            self.rowClick.emit({
                                task: this.task,
                                user: data
                            });
                        });

                    }
                    return row;
                }
            };
        });
    }

    checkboxHeaderChange(checked) {
        this._showFacets = false;
        this.isCheckedAll = checked;
        if (checked) {
            this.spinnerService.show();
            $(
                this.el.nativeElement.querySelectorAll(
                    'input#checkbox-row:not(:checked)'
                )
            ).prop('checked', true);
            this.queryParams['size'] = this.recordsTotal;
            this._userHttpService
                .searchUserManagementWithPagination(this.queryParams)
                .subscribe((res: any) => {
                    this.selectedUsers = {};
                    this._userSearchingService.constructSearchResultData(
                        res
                    ).then(resultData => {
                        _.forEach(resultData, (user: any) => {
                            this._showFacets = true;
                            this.selectedUsers[user.userId] = user;
                        });
                        setTimeout(_ => {this.spinnerService.hide(); });
                        this.selectedRows.emit(_.values(this.selectedUsers));
                    });
                });
        } else {
            $(this.el.nativeElement.querySelectorAll(
                'input#checkbox-row:checked'
            )).prop('checked', false);
            $(this.el.nativeElement.querySelectorAll(
                'input#checkbox-header:checked'
            )).prop('checked', false);

            this.selectedUsers = {};
            this.selectedRows.emit([]);
        }
    }

    checkboxRowChange(checked, data) {
        if (checked) {
            this.selectedUsers[data.userId] = data;
        } else {
            _.forEach(_.keys(this.selectedUsers), key => {
                if (_.isEqual(_.toString(data.userId), _.toString(key))) {
                    delete this.selectedUsers[key];
                }
            });
        }
        this.selectedRows.emit(_.values(this.selectedUsers));
    }

    /**
     * searching
     *
     * @author edqin
     * @param {any} $event
     * @memberof NaturalPersonSearchComponent
     */
    public onSearchClick($event) {
        this.spinnerService.show();
        // Clear up check all list after user click search
        this.checkboxHeaderChange(false);
        if (this.dtComponent) {
            this.dtComponent.dtElement.dtInstance.then(
                (dtInstance: DataTables.Api) => {
                    dtInstance.columns.adjust().draw();
                }
            );
        }
        this.searchValue = _.trim($event.searchValue);
        if (CommonUtils.isValueEmpty(this.searchValue)) {
            this.dtOptions = null;
            setTimeout(_ => {
                this.spinnerService.hide();
            });
        } else {
            // clear facet filter
            this.facetsFilter = {};
            this.optionalFilter = {
                country_120001: {},
                rolefacet: {},
                groupfacet: {}
            };
            if (this.router.url.startsWith(Path.USER_PROFILE_SEARCH)) {
                this.searchFormHelperService.saveSearchForm($event, 'USER_SEARCH_FORM');
            }
            this.searchConditions = $event;
            this.initialTableData();
        }
    }

    public onSelectFacetFilter($event) {
        this.facetsFilter = $event['optionalFilter'];
        this.lastFilterType = $event['lastFilterType'];
    }

    addUserClick() {
        this.rowClick.emit({type: 'add_item', searchValue: this.searchFormComponent.searchForm.searchValue});
    }

    ngOnInit() {
        this.spinnerService.show();
        this.initialSearchFilterConfigs();
        if (this.routeInfo.snapshot.queryParams['search-form']) {
            const searchConditions = this.searchFormHelperService.getSearchForm('USER_SEARCH_FORM');
            if (searchConditions) {
                searchConditions.isClickEvent = false;
                this.searchConditions = searchConditions;
                this.searchFormComponent.searchForm = searchConditions;
                this.searchValue = searchConditions.searchValue ? searchConditions.searchValue : null;
                this.facetsFilter = {};
                this.optionalFilter = {
                    country_120001: {},
                    rolefacet: {},
                    groupfacet: {}
                };
                this.initialTableData();
            }
        } else if (this.domain === 'remove_collaborator' && this.task) {
            this.initialTableData();
        }
    }
}
