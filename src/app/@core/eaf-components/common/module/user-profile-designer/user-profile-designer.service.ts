/**
 * Created Date: Tuesday, December 19th 2017, 11:01 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KSCAdvanceFormEditorOptionBlock } from '@platform/advance-components/ksc-advance-form-editor/model/ksc-advance-form-editor.option.block.model';
import { KSCAdvanceFormEditorOptionContent } from '@platform/advance-components/ksc-advance-form-editor/model/ksc-advance-form-editor.option.content.model';
import { KSCAdvanceFormEditorOption } from '@platform/advance-components/ksc-advance-form-editor/model/ksc-advance-form-editor.option.model';
import { CommonConstant } from '@platform/common/constants/common.constant';
import { CommonUtils } from '@platform/common/util/common-utils';
import { UserProfileCodeType } from '@platform/eaf-components/common/module/user-profile-designer/model/user-profile-code-type.enum';
import { UserProfileMainModel } from '@platform/eaf-components/common/module/user-profile-designer/model/user-profile-main.model';
import { UserProfileModel } from '@platform/eaf-components/common/module/user-profile-designer/model/user-profile.model';
import { ReferenceAsyncCacheService } from '@platform/eaf-components/common/services/reference-async-cache.service';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Injectable()
export class UserProfileDesignerService {

    /**
     * Creates an instance of UserProfileDesignerService.
     *
     * @param {HttpClient} _httpClient
     * @memberof UserProfileDesignerService
     */
    constructor(private httpClient: HttpClient,
                private translate: TranslateService,
                @Inject('ReferenceAsyncCacheService') private referenceAsyncCacheService: ReferenceAsyncCacheService
    ) {
    }

    constructUserProfile(user) {
        const entity = {};
        const detailBlock = {};
        if (!user.userDetailModel) {
            user.userDetailModel = {}
        }
        Object.keys(user).forEach(key => {
            const attr = user[key];
            if (Object.prototype.toString.call(attr) === '[object Array]') {
                if (this.checkDetailBlockAttr(key, true)) {
                    entity[key] = attr;
                }
            } else {
                if (this.checkDetailBlockAttr(key, false)) {
                    detailBlock[key] = attr;
                }
            }
        });
        Object.keys(user.userDetailModel).forEach(key => {
            const attr = user.userDetailModel[key];
            detailBlock[key] = attr;
        });
        entity['detailBlock'] = detailBlock;
        // for add mode, "addressList" and "contactMethodList" will be null
        // so we set a empty list for entity to ensure the detail tab can correctly handing data
        if (!entity['addressList']) {
            entity['addressList'] = [];
        }
        if (!entity['contactMethodList']) {
            entity['contactMethodList'] = [];
        }
        return entity;
    }

    // check if the attribute is in the user profile tab
    checkDetailBlockAttr(attrName: string, isArray: boolean) {
        if (isArray) {
            if (attrName === 'addressList' || attrName === 'contactMethodList') {
                return true;
            } else {
                return false;
            }
        } else {
            if (attrName === 'firstName' || attrName === 'lastName' || attrName === 'interests' || attrName === 'title' || attrName === 'effectiveDate' || attrName === 'bio' || attrName === 'birthdate') {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * get user profile detail config
     *
     * @returns {Promise<KSCAdvanceFormEditorOption>}
     * @memberof UserProfileDesignerService
     */
    getUserProfileConfiguration(): Promise<KSCAdvanceFormEditorOption> {
        const promise = new Promise<KSCAdvanceFormEditorOption>(
            (resolve, reject) => {
                this.httpClient.get<KSCAdvanceFormEditorOption>('assets/user-profile.config.json')
                    .subscribe((res: KSCAdvanceFormEditorOption) => {
                        this._constructUserProfileConfiguration(res).then(config => {
                            resolve(config);
                        });
                    });
            }
        );
        return promise;
    }

    /**
     * construct legal entity config
     *
     * @private
     * @param {KSCAdvanceFormEditorOption} config
     * @returns {KSCAdvanceFormEditorOption}
     * @memberof UserProfileDesignerService
     */
    private _constructUserProfileConfiguration(config: KSCAdvanceFormEditorOption): Promise<KSCAdvanceFormEditorOption> {
        const promise: Promise<any> = new Promise((resolve, reject) => {
            if (!_.isEmpty(config.blocks)) {
                let resolveFlag = 0;
                _.forEach(
                    config.blocks,
                    (block: KSCAdvanceFormEditorOptionBlock) => {
                        if (!_.isEmpty(block.blockContent)) {
                            _.forEach(
                                block.blockContent,
                                (content: KSCAdvanceFormEditorOptionContent) => {
                                    let categortKey = '';
                                    let hasParent: boolean = false;
                                    switch (content.entryKey) {
                                        case UserProfileCodeType.Address:
                                            // set address options
                                            categortKey = 'ADDRESS_TYPE';
                                            break;
                                        case UserProfileCodeType.Country:
                                            // set Country options
                                            categortKey = 'COUNTRY_DATA';
                                            break;
                                        case UserProfileCodeType.StateProvince:
                                            // set StateProvince options
                                            categortKey = 'STATE_PROVINCE_DATA';
                                            hasParent = true;
                                            break;
                                        case UserProfileCodeType.ContactMethodType:
                                            // set ContactMethodType options
                                            categortKey = 'CONTACT_METHOD_TYPE';
                                            break;
                                        default:
                                            break;
                                    }
                                    if (!CommonUtils.isValueEmpty(categortKey)) {
                                        resolveFlag += 1;
                                        this.constructSelectOptions(this.referenceAsyncCacheService.getDataByKey(categortKey), hasParent).then(data => {
                                            content.initData = data;
                                            resolveFlag -= 1;
                                            if (resolveFlag === 0) {
                                                resolve(config);
                                            }
                                        });
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });
        return promise;
    }

    /**
     * Construct select type options
     *
     * @author edqin
     * @private
     * @param {Array<object>} list
     * @returns {Array<object>}
     * @memberof UserProfileDesignerService
     */
    public constructSelectOptions(
        categoryPromise: Promise<Array<object>>,
        hasParent?: boolean,
        isBoth?: boolean): Promise<Array<any>> {
        const promise: Promise<Array<object>> = new Promise((resolve, reject) => {
            categoryPromise.then(list => {
                const options = [];
                // blank options
                options.push({
                    id: '',
                    text: ''
                });
                if (!_.isEmpty(list)) {
                    _.forEach(list, (element: any) => {
                        if (hasParent) {
                            options.push({
                                id: element.id,
                                text: isBoth
                                    ? `${element.key} :  ${element.displayKey}`
                                    : element.displayKey,
                                parentId: element.parentId
                            });
                        } else {
                            options.push({
                                id: element.id,
                                text: isBoth
                                    ? `${element.key} :  ${element.displayKey}`
                                    : element.displayKey
                            });
                        }
                    });
                }
                resolve(options);
            });
        });
        return promise;
    }

    /**
     * Validate user then set mail from natural person to user
     *
     * @param {UserProfileMainModel} userObj
     * @returns
     * @memberof UserProfileDesignerService
     */
    public validateUserEmail(userObj: UserProfileMainModel) {
        // front-end business check: email address is a required filed.
        const naturalPersonContactList = userObj.contactMethodList;
        if (_.isEmpty(naturalPersonContactList)) {
            return this.translate.instant('AT_LEAST_ONE_EMAIL_ADDRESS');
        } else {
            let hasEmail = false;
            _.forEach(naturalPersonContactList, (element) => {
                const code = element['contactMethodTypeCode'];
                if (_.isEqual(code, 160001) || _.isEqual(code, '160001')) {
                    userObj.email = element['contactMethodValue'];
                    hasEmail = true;
                }
            });
            if (!hasEmail) {
                return this.translate.instant('AT_LEAST_ONE_EMAIL_ADDRESS');
            }
        }
        return null;
    }

    /**
     * Create user workitem model for saving
     *
     * @param {UserProfileUserModel} userObj
     * @return {UserProfileModel}
     * @memberof UserProfileDesignerService
     */
    public createUserWorkItemModel(userObj: UserProfileMainModel, fullWorkItemModel? :any): UserProfileModel {
        const fullUserWorkItem = new UserProfileModel();
        // original model should keep in new created workitem model.
        if (fullWorkItemModel && fullWorkItemModel.originalModel) {
            fullUserWorkItem.originalModel = fullWorkItemModel.originalModel;
        }
        // delete unnecessary flag.
        // If there is no group and role, groupList and roleList will be null, so skip handing
        for (let i = 0; userObj.groupList && i < userObj.groupList.length; i++) {
            if (userObj.groupList[i].isNew) {
                delete userObj.groupList[i].isNew;
            }
            delete userObj.groupList[i].httpStatusCode;
            delete userObj.groupList[i].count;
        }

        for (let i = 0; userObj.roleList && i < userObj.roleList.length; i++) {
            if (userObj.roleList[i].isNew) {
                delete userObj.roleList[i].isNew;
            }
            delete userObj.roleList[i].httpStatusCode;
            delete userObj.roleList[i].count;
        }

        for (let i = 0; userObj.contactMethodList && i < userObj.contactMethodList.length; i++) {
            if (userObj.contactMethodList[i].isNew) {
                delete userObj.contactMethodList[i].isNew;
            }
            delete userObj.contactMethodList[i].httpStatusCode;
            delete userObj.contactMethodList[i].count;
        }

        for (let i = 0; userObj.addressList && i < userObj.addressList.length; i++) {
            if (userObj.addressList[i].isNew) {
                delete userObj.addressList[i].isNew;
            }
            delete userObj.addressList[i].httpStatusCode;
            delete userObj.addressList[i].count;
        }
        userObj.groupList = userObj.groupList ? userObj.groupList : [];
        userObj.roleList = userObj.roleList ? userObj.roleList : [];
        // add default value for flag
        if (_.isUndefined(userObj.isActive) || _.isNull(userObj.isActive)) {
            userObj.isActive = true;
        }
        if (_.isUndefined(userObj.isLocked) || _.isNull(userObj.isLocked)) {
            userObj.isLocked = false;
        }
        // clean '' value in object, as dynamoDB cannot handle this value
        _.keys(userObj).forEach((key) => {
            if (userObj[key] === '') {
                userObj[key] = null;
            }
        });

        CommonConstant.COPY_NATURAL_PERSON_MODEL__ARRAY.forEach(function (attr) {
            if (userObj[attr] != null) {
                userObj.userDetailModel[attr] = userObj[attr];
            }
        });

        CommonConstant.COPY_NATURAL_PERSON_DUPLICATED_FIELD.forEach(function (attr) {
            delete userObj[attr];
        });

        if (userObj['fullPath']) {
            userObj.userDetailModel['picture'] = userObj['fullPath'];
        }

        // fill object by user and person
        fullUserWorkItem.model = userObj;
        this.cleanWorkItemModel(fullUserWorkItem.model);
        return fullUserWorkItem;
    }

    cleanWorkItemModel(model: any) {
        if (model.userDetailModel) {
            delete model.userDetailModel.httpStatusCode;
        }
    }

    /**
     * Mix EntityInfo Back To User Domain
     * As detail tab uses the entity, so we need to merge the changes in entity back to user domain
     *
     * @param {UserProfileMainModel} personObj
     * @param {*} entity
     * @memberof UserProfileDesignerService
     */
    public mixEntityInfoBackToUser(user: UserProfileMainModel, entity: any) {
        // fullfill addressList
        user.addressList = [];
        if (entity['addressList'] && entity['addressList'].length > 0) {
            entity['addressList'].forEach(address => {
                this.destroyUselessAttribute(address, 'index');
                user.addressList.push(address);
            })
        }
        // fullfill contactMethodList
        user.contactMethodList = [];
        if (entity['contactMethodList'] && entity['contactMethodList'].length > 0) {
            entity['contactMethodList'].forEach(contact => {
                this.destroyUselessAttribute(contact, 'index');
                user.contactMethodList.push(contact);
            })
        }

        // fullfill other attribute
        if (entity['detailBlock']) {
            const detail = entity['detailBlock'];
            this.destroyUselessAttribute(detail, 'index', 'fullPath', 'pictureName');
            Object.keys(detail).forEach(key => {
                if (key !== 'userDetailModel' && key !== 'preferredLanguage' && key !== 'preferredCurrency'
                    && key !== 'preferredTimeZone' && key !== 'preferredPageSize' && key !== 'isActive' && key !== 'attributes') {
                    user[key] = detail[key];
                }
            });
            if (_.isEmpty(user.userDetailModel)) {
                // user.userDetailModel = new UserProfileDetailModel();
                if (!user.userId || user.userId < 0) {
                    user.userDetailModel.effectiveDate = moment(new Date()).toISOString();
                }
                user.userDetailModel.isActive = true;
                user.userDetailModel.userId = user.userId;
            }
            CommonConstant.COPY_NATURAL_PERSON_DUPLICATED_FIELD_OF_UI.forEach(function (attr) {
                user.userDetailModel[attr] = detail[detail];
                if (!user.userDetailModel[attr] || user.userDetailModel[attr] === '') {
                    delete user.userDetailModel[attr];
                }
            })
        }
    }

    /**
     * Remove useless attributes
     *
     * @private
     * @param {object} targetObject
     * @param {...string[]} attrName
     * @memberof UserProfileDesignerService
     */
    private destroyUselessAttribute(targetObject: object, ...attrName: string[]) {
        if (attrName) {
            attrName.forEach(attr => {
                if (_.has(targetObject, attr)) {
                    delete targetObject[attr];
                }
            })
        }
    }

    /**
     * Costruct User Profile Preference Options
     *
     * @returns
     * @memberof UserProfileDesignerService
     */
    public constructUserProfilePreferenceOptions(): Promise<any> {
        const promise: Promise<any> = new Promise(resolve => {
            const options = {};
            Promise.all([this.referenceAsyncCacheService.getDataByKey('LANGUAGE_TYPE'),
                this.referenceAsyncCacheService.getDataByKey('TIME_ZONE'),
                this.referenceAsyncCacheService.getDataByKey('CURRENCY_TYPE'),
                this.referenceAsyncCacheService.getDataByKey('PAGE_SIZE_DEFAULT')]).then(referenceArr => {
                const languageTypeList = [{id: '', text: ''}];
                const timeZoneList = [{id: '', text: ''}];
                const currencyTypeList = [{id: '', text: ''}];
                const pageSizeDefaultList = [{id: '', text: ''}];
                _.forEach(referenceArr[0], (language) => {
                    languageTypeList.push({
                        id: language['id'],
                        text: language['displayKey']
                    })
                });
                _.forEach(referenceArr[1], (timeZone) => {
                    timeZoneList.push({
                        id: timeZone['id'],
                        text: timeZone['displayKey']
                    })
                });
                _.forEach(referenceArr[2], (currency) => {
                    currencyTypeList.push({
                        id: currency['id'],
                        text: currency['displayKey']
                    })
                });
                _.forEach(referenceArr[3], (pageSize) => {
                    pageSizeDefaultList.push({
                        id: pageSize['id'],
                        text: pageSize['displayKey']
                    })
                });
                // set formatted list into object
                options[UserProfileCodeType.LanguageType] = languageTypeList;
                options[UserProfileCodeType.TimeZone] = timeZoneList;
                options[UserProfileCodeType.CurrencyType] = currencyTypeList;
                options[UserProfileCodeType.PageSizeDefault] = pageSizeDefaultList.sort((optionA, optionB) => {
                    const idA = optionA.id ? _.parseInt(optionA.id, 10) : 0;
                    const idB = optionB.id ? _.parseInt(optionB.id, 10) : 0;
                    return idA - idB;
                });
                resolve(options);
            })
        })
        return promise;
    }

    /**
     * Retrieve Location Nodes for role
     *
     * @returns
     * @memberof UserProfileDesignerService
     */
    public retrieveLocationNodes(): Promise<Array<any>> {
        const promise: Promise<Array<any>> = new Promise(resolve => {
            this.referenceAsyncCacheService.getDataByKey('LOCATION_HIERARCHY').then(reference => {
                const nodes = [];
                const nodesArr = this.retrieveLocationHierarchy(reference);
                for (let j = 0; j < nodesArr.length; j++) {
                    nodes.push(nodesArr[j]);
                }
                resolve(nodes);
            })
        })
        return promise;
    }

    /**
     * retrieveLocationHierarchy
     *
     * @private
     * @param {any} ary
     * @param {any} data
     * @returns
     * @memberof UserProfileDesignerService
     */
    private retrieveLocationHierarchy(array) {
        array.forEach(f => {
            f.children = _(array).filter(g => g.parentId === f.id).value();
            if (!_.isEmpty(f.children)) {
                f.children.sort((a, b) => {return a.displayOrder - b.displayOrder});
            }
        });
        let resultArray = _(array).filter(f => f.parentId == null).value();
        resultArray = _.orderBy(resultArray, ['displayOrder'], ['asc']);
        _.forEach(resultArray, (root: any) => {
            root.children = _.orderBy(root.children, ['displayOrder'], ['asc']);
        });
        return resultArray;
    }
}
