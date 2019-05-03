/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Inject, Injectable } from '@angular/core';
import { CommonConstant } from '@platform/common/constants/common.constant';
import { ReferenceAsyncUtilService } from '@platform/common/services/reference-async-util.service';
import { UserHttpService } from '@platform/eaf-components/common/services/http/user-http.service';
import { ReferenceAsyncCacheService } from '@platform/eaf-components/common/services/reference-async-cache.service';
import * as _ from 'lodash';


@Injectable()
export class AdministrationService extends ReferenceAsyncUtilService {

    constructor(
        private userHttpService: UserHttpService,
        @Inject('ReferenceAsyncCacheService') private referenceAsync: ReferenceAsyncCacheService
    ) {
        super(referenceAsync);
    }

    // userd for get user profile card when hovering on the user table.
    getHoverObject(user: any) {
        return this.userHttpService
            .getUserByUserId(user.userId);
    }

    verifyReference(id, category) {
        let name = '';
        const referenceList: any = this.categoriesMap.get(category);
        if (_.find<any>(referenceList, { id: id })) {
            name = _.find<any>(referenceList, { id: id }).displayKey;
        }
        return name;
    }

    getFullProfileCard(person, user) {
        const currentHoverObj: any = {
            currentHoverUser: {},
            currentHoverPerson: {},
            workAddress: null,
            workNumber: null,
            showUserPopover: false
        };

        let currentHoverPerson = person;
        let workAddress = null;
        let workNumber = null;
        let currentHoverUser = null;
        if (currentHoverPerson && currentHoverPerson.fullPath) {
            currentHoverUser = user;
        } else {
            if (!currentHoverPerson) {
                currentHoverPerson = {};
            }
            currentHoverUser = user;
        }

        if (
            currentHoverPerson.contactMethodList &&
            currentHoverPerson.contactMethodList.length
        ) {
            currentHoverPerson.contactMethodList.forEach(con => {
                if (
                    con.contactMethodTypeCode ===
                    CommonConstant.CONTACT_METHOD_TYPE_REF
                        .BUSINESS_PHONE_NUMBER
                ) {
                    workNumber = con.contactMethodValue;
                }
            });
        }
        if (currentHoverPerson.addressList) {
            for (
                let i = 0;
                i < currentHoverPerson.addressList.length;
                i++
            ) {
                if (
                    currentHoverPerson.addressList[i]
                        .addressTypeCode ===
                    CommonConstant.ADDRESS_TYPE_REF.LEGAL
                ) {
                    workAddress = '';
                    if (
                        currentHoverPerson.addressList[i]
                            .addressLineOne
                    ) {
                        workAddress =
                            currentHoverPerson.addressList[i]
                                .addressLineOne;
                    }
                    if (currentHoverPerson.addressList[i].city) {
                        if (!workAddress) {
                            workAddress =
                                currentHoverPerson.addressList[i]
                                    .city;
                        } else {
                            workAddress =
                                workAddress +
                                ', ' +
                                currentHoverPerson.addressList[i]
                                    .city;
                        }
                    }
                    if (
                        currentHoverPerson.addressList[i]
                            .stateProvinceCode
                    ) {
                        if (!workAddress) {
                            workAddress = this.verifyReference(
                                currentHoverPerson.addressList[i]
                                    .stateProvinceCode,
                                'STATE_PROVINCE_DATA'
                            );
                        } else {
                            workAddress =
                                workAddress +
                                ', ' +
                                this.verifyReference(
                                    currentHoverPerson.addressList[
                                        i
                                        ].stateProvinceCode,
                                    'STATE_PROVINCE_DATA'
                                );
                        }
                    }
                    if (
                        currentHoverPerson.addressList[i]
                            .countryCode
                    ) {
                        if (!workAddress) {
                            workAddress = this.verifyReference(
                                currentHoverPerson.addressList[i]
                                    .countryCode,
                                'COUNTRY_DATA'
                            );
                        } else {
                            workAddress =
                                workAddress +
                                ', ' +
                                this.verifyReference(
                                    currentHoverPerson.addressList[
                                        i
                                        ].countryCode,
                                    'COUNTRY_DATA'
                                );
                        }
                    }

                    if (
                        currentHoverPerson.addressList[i].postalCode
                    ) {
                        if (!workAddress) {
                            workAddress =
                                currentHoverPerson.addressList[i]
                                    .postalCode;
                        } else {
                            workAddress =
                                workAddress +
                                ', ' +
                                currentHoverPerson.addressList[i]
                                    .postalCode;
                        }
                    }
                }
            }
        }
        if (currentHoverPerson.userDetailModel) {
            currentHoverPerson.fullPath = currentHoverPerson.userDetailModel.picture;
        }
        currentHoverObj.currentHoverUser = currentHoverUser;
        currentHoverObj.currentHoverUser.userFullName = currentHoverObj.currentHoverUser.lastName + ', ' + currentHoverObj.currentHoverUser.firstName;
        currentHoverObj.currentHoverPerson = currentHoverPerson;
        if (currentHoverObj.currentHoverPerson.userDetailModel) {
            currentHoverObj.currentHoverPerson.title = currentHoverObj.currentHoverPerson.userDetailModel.title;
        }
        currentHoverObj.workAddress = workAddress;
        currentHoverObj.workNumber = workNumber;
        currentHoverObj.showUserPopover = true;
        return currentHoverObj;
    }
}
