/**
 * Created Date: Friday, December 15th 2017, 03:28:03 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Injectable, Inject } from '@angular/core';
import { KSCAdvanceSearchFormConditionModel } from '@platform/advance-components/ksc-advance-search-form/ksc-advance-search-form-condition.model';
import { KSCAdvanceSearchFormModel } from '@platform/advance-components/ksc-advance-search-form/ksc-advance-search-form.model';
import { KSCAdvanceSearchResultFacetTypeModel } from '@platform/advance-components/ksc-advance-search-result/ksc-advance-search-result-facet-type.model';
import { KSCAdvanceSearchResultFacetModel } from '@platform/advance-components/ksc-advance-search-result/ksc-advance-search-result-facet.model';
import { KSCAdvanceSearchResultSelectpickerModel } from '@platform/advance-components/ksc-advance-search-result/ksc-advance-search-result-selectpicker.model';
import { CommonUtils } from '@platform/common/util/common-utils';
import { ReferenceAsyncCacheService } from '@platform/eaf-components/common/services/reference-async-cache.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import {
    WORKFLOW_HTTP_TOKEN,
    WorkflowHttpServiceInterface
} from '@platform/common/services/workflow-http.service.interface';

@Injectable()
export class UserSearchingService {

    public domain: string;

    private _sortingMap: Array<object>;

    public get sortingMap(): Array<object> {
        return this._sortingMap;
    }

    public set sortingMap(value: Array<object>) {
        this._sortingMap = value;
    }

    constructor(@Inject('ReferenceAsyncCacheService')
                private referenceAsyncCacheService: ReferenceAsyncCacheService,
                private toastrService: ToastrService,
                @Inject(WORKFLOW_HTTP_TOKEN)
                private workflowHttpService: WorkflowHttpServiceInterface) {
    }

    /**
     * This private method used for inital data sortable mapping
     *
     * @author edqin
     * @private
     * @memberof LegalEntitySearchService
     */
    private _initialDataSortMapping(): void {
        this.sortingMap = [
            {field: 'lastName', sortName: 'lastname'},
            {field: 'firstName', sortName: 'firstname'},
            {field: 'email', sortName: 'email'},
            {field: 'isActive', sortName: 'isactive'},
            {field: 'effectiveDate', sortName: 'effectivedate'},
            {field: 'username', sortName: 'username'},
            {field: 'city_120001', sortName: 'city_120001'},
            {field: 'city_120002', sortName: 'city_120002'},
            {field: 'city_120003', sortName: 'city_120003'},
            {field: 'city_120004', sortName: 'city_120004'},
            {field: 'city_120005', sortName: 'city_120005'},
            {field: 'group', sortName: 's_all_groups'},
            {field: 'role', sortName: 's_all_roles'},
            {field: 'title', sortName: 'title'},
            {field: 'birthdate', sortName: 'birthdate'}
        ];
    }

    /**
     * construct search filter configs
     *
     * @author edqin
     * @param {Array<object>} groups
     * @param {Array<object>} roles
     * @returns {Array<KSCAdvanceSearchFormConditionModel>}
     * @memberof NaturalPersonSearchService
     */
    public constructSearchFilterConfigs(
        groups: Array<object>,
        roles: Array<object>
    ): Promise<Array<KSCAdvanceSearchFormConditionModel>> {
        const promise: Promise<Array<KSCAdvanceSearchFormConditionModel>> = new Promise(resolve => {
            this.referenceAsyncCacheService.getDataByKey('COUNTRY_DATA').then(countryList => {
                const groupOptions = [];
                const rolesOptions = [];
                _.forEach(groups, (group: any) => {
                    groupOptions.push({
                        id: group.groupId,
                        text: group.groupName
                    });
                });
                _.forEach(roles, (role: any) => {
                    rolesOptions.push({
                        id: role.roleId,
                        text: role.roleName
                    });
                });
                const filterConfigs = [
                    new KSCAdvanceSearchFormConditionModel(
                        '1',
                        'Country',
                        'country',
                        countryList,
                        'true'
                    ),
                    new KSCAdvanceSearchFormConditionModel(
                        '2',
                        'City',
                        'city',
                        null,
                        'true'
                    ),
                    new KSCAdvanceSearchFormConditionModel(
                        '3',
                        'Effective After Date',
                        'effectiveDate',
                        [],
                        'true',
                        'date'
                    ),
                    new KSCAdvanceSearchFormConditionModel(
                        '4',
                        'Group',
                        'group',
                        groupOptions,
                        'true'
                    ),
                    new KSCAdvanceSearchFormConditionModel(
                        '5',
                        'Role',
                        'role',
                        rolesOptions,
                        'true'
                    )
                ];
                resolve(filterConfigs);
            });
        });
        return promise;
    }

    /**
     * This public method used for dataTable.settings.columns configuration.
     *
     * @author edqin
     * @param domain
     * @returns
     * @memberof NaturalPersonSearchService
     */
    public constructorDtColumns(domain): Promise<any> {
        this.domain = domain;
        const promise: Promise<any> = new Promise(resolve => {
            const data = {
                allColumns: [],
                visibleColumns: [],
                defaultColumns: []
            };
            data.allColumns = [
                {
                    title: 'Last Name',
                    data: 'lastName',
                    orderable: true,
                    defaultContent: ''
                },
                {
                    title: 'First Name',
                    data: 'firstName',
                    orderable: true,
                    defaultContent: ''
                },
                {
                    title: 'Email',
                    data: 'email',
                    orderable: true,
                    defaultContent: ''
                },
                {
                    title: 'Account Status',
                    data: 'isActive',
                    orderable: true,
                    defaultContent: ''
                },
                {
                    title: 'Effective Date',
                    data: 'effectiveDate',
                    orderable: true,
                    defaultContent: ''
                },
                {
                    title: 'Username',
                    data: 'username',
                    orderable: true,
                    defaultContent: ''
                },
                {
                    title: 'Group',
                    data: 'group',
                    orderable: true,
                    defaultContent: ''
                },
                {
                    title: 'Role',
                    data: 'role',
                    orderable: true,
                    defaultContent: ''
                },
                {
                    title: 'Title',
                    data: 'title',
                    orderable: true,
                    defaultContent: ''
                },
                {
                    title: 'Birthdate',
                    data: 'birthdate',
                    orderable: true,
                    defaultContent: ''
                },
                {
                    title: 'Interests',
                    data: 'interests',
                    orderable: false,
                    defaultContent: ''
                },
                {
                    title: 'Bio',
                    data: 'bio',
                    orderable: false,
                    defaultContent: ''
                }
            ];
            Promise.all([this.referenceAsyncCacheService.getDataByKey('ADDRESS_TYPE'),
                this.referenceAsyncCacheService.getDataByKey('CONTACT_METHOD_TYPE')]).then(referenceArr => {
                const addressTypeList = referenceArr[0],
                    contactMethodTypeList = referenceArr[1],
                    cityList = [],
                    countryList = [];
                _.forEach(addressTypeList, (address: any) => {
                    cityList.push({
                        title: `${address.displayKey} City`,
                        data: `city_${address.id}`,
                        orderable: true,
                        defaultContent: ''
                    });
                    countryList.push({
                        title: `${address.displayKey} Country`,
                        data: `country_${address.id}`,
                        orderable: false,
                        defaultContent: ''
                    });
                    countryList.push({
                        title: `${address.displayKey} Address Line 1`,
                        data: `address_line_one_${address.id}`,
                        orderable: false,
                        defaultContent: ''
                    });
                    countryList.push({
                        title: `${address.displayKey} State / Province`,
                        data: `state_${address.id}`,
                        orderable: false,
                        defaultContent: ''
                    });
                });
                const contactList = [];
                _.forEach(contactMethodTypeList, (contact: any) => {
                    if (contact.id != 160001) {
                        contactList.push({
                            title: `${contact.displayKey}`,
                            data: `contact_${contact.id}`,
                            orderable: false,
                            defaultContent: ''
                        });
                    }
                });
                data.allColumns = data.allColumns.concat(countryList).concat(cityList).concat(contactList);
                if (_.isEqual(domain, 'add_item')) {
                    const firstColumn = {
                        title: '<input id="checkbox-header" type="checkbox"></input>',
                        orderable: false,
                        render: (data, type, row, meta) => {
                            return `<input id="checkbox-row" type="checkbox" value="selectedUsers[row.userId]"></input>`;
                        }
                    };
                    data.allColumns.unshift(firstColumn);
                    data.visibleColumns = [0, 1, 2, 3, 4, 5];
                    data.defaultColumns = [0, 1, 2, 3];
                } else {
                    data.visibleColumns = [0, 1, 2, 3, 4];
                    data.defaultColumns = [0, 1, 2];
                    // Create Last Column Header for View/Edit link
                    let buttonText = 'View Details';
                    let buttonContent = '<a id="viewRow">' + buttonText + '</a>';
                    if (domain === 'select_user') {
                        buttonText = 'Select';
                        buttonContent = '<a id="viewRow">' + buttonText + '</a>';
                    }
                    if (domain === 'select_collaborator') {
                        buttonText = 'ADD';
                        buttonContent = '<button id="viewRow-add-collaborator" style="background-color: #337AB7;padding: 3px;color: white;font-size: 12px;width: 80px;display: inline-block;text-align: center;border: none">' + buttonText + '</button>';
                    }
                    if (domain === 'remove_collaborator') {
                        buttonText = 'REMOVE';
                        buttonContent = '<button id="viewRow-remove-collaborator" style="background-color: #337AB7;padding: 3px;color: white;font-size: 12px;width: 80px;display: inline-block;text-align: center;border: none">' + buttonText + '</button>';
                    }
                    data.allColumns.push({
                        title: 'Action',
                        data: 'operatorCol',
                        orderable: false,
                        defaultContent: buttonContent
                    });
                    data.visibleColumns.push(data.allColumns.length - 1);
                    data.defaultColumns.push(data.allColumns.length - 1);
                }
                 resolve (data);
            })
        });
        return promise;
    }

    /**
     * This public mehtod used for construct query paramaters for searching
     *
     * @author edqin
     * @param {KSCAdvanceSearchFormModel} searchModel
     * @param {*} facetFilter
     * @param {*} settings
     * @returns {object}
     * @memberof LegalEntitySearchService
     */
    public constructorQueryparams(
        searchModel: KSCAdvanceSearchFormModel,
        facetFilter: any,
        settings: any
    ): object {
        this._initialDataSortMapping();
        const queryParams = {
            allNames: searchModel.searchValue,
            isActive: searchModel.isInactive ? null : true,
            start: settings._iDisplayStart,
            size: settings._iDisplayLength,
            filterQuery: {}
        };
        if (!_.isEmpty(facetFilter.country_120001)) {
            _.map(facetFilter.country_120001, (value: boolean, key: string) => {
                if (value) {
                    queryParams.filterQuery['country_120001'] = _.parseInt(key);
                }
            });
        }
        if (!_.isEmpty(facetFilter.rolefacet)) {
            _.map(facetFilter.rolefacet, (value: boolean, key: string) => {
                if (value) {
                    if (queryParams.filterQuery['rolefacet']) {
                        queryParams.filterQuery['rolefacet'] = queryParams.filterQuery['rolefacet'] + ',' + key;
                    } else {
                        queryParams.filterQuery['rolefacet'] = key;
                    }
                }
            });
        }
        if (!_.isEmpty(facetFilter.groupfacet)) {
            _.map(facetFilter.groupfacet, (value: boolean, key: string) => {
                if (value) {
                    if (queryParams.filterQuery['groupfacet']) {
                        queryParams.filterQuery['groupfacet'] = queryParams.filterQuery['groupfacet'] + ',' + key;
                    } else {
                        queryParams.filterQuery['groupfacet'] = key;
                    }
                }
            });
        }
        _.forEach(searchModel.conditions, element => {
            if (element.value) {
                if (_.isEqual(element.config.type, 'date')) {
                    queryParams[element.config.searchKey] = moment.utc(element.value).format('YYYY-MM-DD');
                } else {
                    queryParams[element.config.searchKey] = element.value;
                }
            }
        });
        if (!_.isEmpty(settings.aaSorting)) {
            const sortMap = _.find(this.sortingMap, {
                field: settings.aoColumns[settings.aaSorting[0][0]].data
            });
            if (!_.isNull(sortMap) && !_.isUndefined(sortMap)) {
                queryParams['sort'] = sortMap['sortName'];
            }
            queryParams['sortDirection'] = settings.aaSorting[0][1];
        }
        return queryParams;
    }

    public constructSearchResultData(data): Promise<Array<object>> {
        /*if(this.domain === 'select_collaborator' && task) {
            this.getCollaborators(task, data.resultList);
            console.log(data.resultList)
        }*/
        const promise: Promise<Array<object>> = new Promise(resolve =>  {
            const result = [];
            if (!_.isEmpty(data.resultList)) {
                Promise.all([this.referenceAsyncCacheService.getDataByKey('COUNTRY_DATA'),
                    this.referenceAsyncCacheService.getDataByKey('ADDRESS_TYPE'),
                    this.referenceAsyncCacheService.getDataByKey('STATE_PROVINCE_DATA'),
                    this.referenceAsyncCacheService.getDataByKey('CONTACT_METHOD_TYPE'),
                ]).then(referenceArr => {
                    _.forEach(data.resultList, (el: any) => {
                        const user = _.cloneDeep(el);
                        let groupName = '',
                            roleName = '';
                        if (!_.isEmpty(user.groupList)) {
                            _.forEach(user.groupList, (value, key) => {
                                if (value.groupName) {
                                    if (CommonUtils.isValueEmpty(groupName)) {
                                        groupName = value.groupName;
                                    } else {
                                        groupName += `,${value.groupName}`;
                                    }
                                }
                            });
                        }
                        if (!_.isEmpty(user.roleList)) {
                            _.forEach(user.roleList, (value, key) => {
                                if (value.roleName && !value.isSystemRole) {
                                    if (CommonUtils.isValueEmpty(roleName)) {
                                        roleName = value.roleName;
                                    } else {
                                        roleName += `,${value.roleName}`;
                                    }
                                }
                            });
                        }
                        if (!user.userDetailModel) {
                            user.userDetailModel = {};
                        }
                        const itemObj = {
                            lastName: user.lastName,
                            firstName: user.firstName,
                            email: user.email,
                            isActive: user.isActive,
                            effectiveDate: user.userDetailModel.effectiveDate,
                            username: user.username,
                            group: groupName,
                            role: roleName,
                            title: user.userDetailModel.title,
                            birthdate: user.userDetailModel.birthdate,
                            user: user,
                            userId: user.userId,
                            interests: user.userDetailModel.interests,
                            bio: user.userDetailModel.bio
                        };
                        if (!_.isUndefined(itemObj.isActive)) {
                            itemObj.isActive = itemObj.isActive ? 'Active' : 'Inactive';
                        }
                        if (itemObj.effectiveDate) {
                            itemObj.effectiveDate = moment
                                .utc(itemObj.effectiveDate)
                                .format('YYYY-MM-DD');
                        }
                        if (itemObj.birthdate) {
                            itemObj.birthdate = moment
                                .utc(itemObj.birthdate)
                                .format('YYYY-MM-DD');
                        }
                        const countryList = referenceArr[0];
                        const addressTypeList = referenceArr[1];
                        const stateProvinceList = referenceArr[2];
                        const contactTypeList = referenceArr[3];
                        // append address
                        if (user.addressList) {
                            _.forEach(user.addressList, (address: any) => {
                                const found = _.find(addressTypeList, {
                                    id: address.addressTypeCode
                                });
                                if (!_.isEmpty(found)) {
                                    // append city
                                    itemObj[`city_${address.addressTypeCode}`] = address.city;
                                    // append country
                                    if (address.countryCode  && _.find(countryList, {id: address.countryCode})) {
                                        itemObj[
                                            `country_${address.addressTypeCode}`
                                            ] = _.find(countryList, {
                                            id: address.countryCode
                                        })['displayKey'];
                                    }
                                    // append address line one
                                    itemObj[`address_line_one_${address.addressTypeCode}`] = address.addressLineOne;
                                    // append state province
                                    if (address.stateProvinceCode  && _.find(stateProvinceList, {id: address.stateProvinceCode})) {
                                        itemObj[
                                            `state_${address.addressTypeCode}`
                                            ] = _.find(stateProvinceList, {
                                            id: address.stateProvinceCode
                                        })['displayKey'];
                                    }
                                }
                            });
                        }
                        // append contact method values
                        if (user.contactMethodList) {
                            _.forEach(user.contactMethodList, (contact: any) => {
                                const found = _.find(contactTypeList, {
                                    id: contact.contactMethodTypeCode
                                });
                                if (!_.isEmpty(found)) {
                                    // append contact method value
                                    itemObj[`contact_${contact.contactMethodTypeCode}`] = contact.contactMethodValue;
                                }
                            });
                        }
                        result.push(itemObj);
                    });
                    resolve(result);
                });
            } else {
                resolve(result);
            }
        });
        return promise;
    }

    /**
     * This public method used for config facets result
     *
     * @author edqin
     * @param {any} data
     * @param {string} lastFilterType
     * @param {any} allRoles
     * @param {any} allGroups
     * @returns {Array<KSCAdvanceSearchResultFacetModel>}
     * @memberof NaturalPersonSearchService
     */
    public constructFacetsResult(
        data,
        lastFilterType,
        allRoles,
        allGroups
    ): Promise<Array<KSCAdvanceSearchResultFacetModel>> {
        const promise: Promise<Array<KSCAdvanceSearchResultFacetModel>> = new Promise (resolve => {
            const facetsArray: Array<KSCAdvanceSearchResultFacetModel> = [],
                country = new KSCAdvanceSearchResultFacetModel(
                    'Country',
                    'country_120001',
                    false,
                    []
                ),
                role = new KSCAdvanceSearchResultFacetModel(
                    'Roles',
                    'rolefacet',
                    false,
                    []
                ),
                group = new KSCAdvanceSearchResultFacetModel(
                    'Groups',
                    'groupfacet',
                    false,
                    []
                );
            this.referenceAsyncCacheService.getDataByKey('COUNTRY_DATA').then(countryList => {
                if (!_.isEmpty(data.country_120001)) {
                    _.map(data.country_120001, (value: string, key: string) => {
                        const found: any = _.find(countryList, {
                            id: _.parseInt(key)
                        });
                        if (!_.isNull(found) && !_.isUndefined(found)) {
                            const facetType = new KSCAdvanceSearchResultFacetTypeModel(
                                key,
                                found.displayKey,
                                value
                            );
                            country.typeList.push(facetType);
                        }
                    });
                }
                if (!_.isEmpty(data.rolefacet)) {
                    _.map(data.rolefacet, (value: string, key: string) => {
                        const found: any = _.find(allRoles, {
                            roleId: _.parseInt(key),
                            isSystemRole: false
                        });
                        if (!_.isNull(found) && !_.isUndefined(found)) {
                            const facetType = new KSCAdvanceSearchResultFacetTypeModel(
                                key,
                                found.roleName,
                                value
                            );
                            role.typeList.push(facetType);
                        }
                    });
                }
                if (!_.isEmpty(data.groupfacet)) {
                    _.map(data.groupfacet, (value: string, key: string) => {
                        const found: any = _.find(allGroups, {
                            groupId: _.parseInt(key)
                        });
                        if (!_.isNull(found) && !_.isUndefined(found)) {
                            const facetType = new KSCAdvanceSearchResultFacetTypeModel(
                                key,
                                found.groupName,
                                value
                            );
                            group.typeList.push(facetType);
                        }
                    });
                }
                facetsArray.push(country);
                facetsArray.push(role);
                facetsArray.push(group);
                _.forEach(facetsArray, (facet => {
                    facet.isOpen = _.isEqual(facet['type'], lastFilterType);
                }))
                resolve(facetsArray);
            });
        });
        return promise;
    }

    /**
     * This public method used for config shown-columns filter
     *
     * @author edqin
     * @param {any} columns
     * @returns {KSCAdvanceSearchResultSelectpickerModel}
     * @memberof NaturalPersonSearchService
     */
    public constructSelectConfiguration(
        columns
    ): KSCAdvanceSearchResultSelectpickerModel {
        const selectData = [],
            defaultValue = [
                'lastName',
                'firstName',
                'email',
                'isActive',
                'effectiveDate'
            ];
        _.forEach(columns, (element: any) => {
            if (!_.isEqual(element.data, 'operatorCol') &&
                !_.isEqual(element.data, 'lastName') &&
                !_.isEqual(element.data, 'firstName') &&
                !_.isEqual(element.data, 'email')) {
                selectData.push({
                    id: element.data,
                    text: element.title
                });
            }
        });
        // set dropdown configuraiton
        const selectConfig = new KSCAdvanceSearchResultSelectpickerModel(
            'multiple',
            {
                liveSearch: true,
                dropdownAlignRight: true,
                noneSelectedText: 'Choose columns to display',
                header: '<a class="restore-btn">Restore Default</a>'
            },
            _.orderBy(selectData, 'text', 'asc'),
            defaultValue,
            'a.restore-btn',
            false
        );
        return selectConfig;
    }

    public constructCollaboratorResultData(data): Promise<Array<object>> {
        const promise: Promise<Array<object>> = new Promise(resolve =>  {
            const result = [];
            if (!_.isEmpty(data)) {
                _.forEach(data, (el: any) => {
                    const user = _.cloneDeep(el);
                    const itemObj = {
                        userId: user.userId,
                        lastName: user.lastName,
                        firstName: user.firstName,
                        email: user.email,
                        isActive: user.isActive,
                        //The effective date is fake and the annotated effective date is useful. The Backstage "UserAccessService" project needs to change UserModelMapper.xml file.
                        //Change to : <select id="getUserListBasicInfo" ... resultMap="BaseResultMap">  ====>  <select id="getUserListBasicInfo" ... resultMap="FullUserMap">
                        //But this resultMap will result in redundant information.
                        //effectiveDate: user.userDetailModel.effectiveDate,
                        effectiveDate: "2019-01-18T08:43:37.802+0000"
                    };
                    if (!_.isUndefined(itemObj.isActive)) {
                        itemObj.isActive = itemObj.isActive ? 'Active' : 'Inactive';
                    }
                    if (itemObj.effectiveDate) {
                        itemObj.effectiveDate = moment
                            .utc(itemObj.effectiveDate)
                            .format('YYYY-MM-DD');
                    }
                    result.push(itemObj);
                });
                resolve(result);
            } else {
                resolve(result);
            }
        });
        return promise;
    }

}
