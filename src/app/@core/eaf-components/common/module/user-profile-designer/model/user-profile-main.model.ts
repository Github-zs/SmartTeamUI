/**
 * Created Date: Thursday, December 21st 2017, 07:01 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { UserProfileDetailModel } from '@platform/eaf-components/common/module/user-profile-designer/model/user-profile-detail.model';

export class UserProfileMainModel {
    userId: number;
    username: string;
    password: string;
    email: string;
    challengeOne: string;
    answerOne: string;
    challengeTwo: string;
    answerTwo: string;
    invitedUser: boolean = false
    isWaitingActivation: boolean = false
    loginAttemptCount: number = 0;
    attemptChallenge: number;
    isLocked: boolean = false
    lockedDate: string;
    trialStartDate: string;
    passwordUpdatedDate: string;
    isActive: boolean = false;
    firstName: string;
    lastName: string;
    attributes: string;
    // from UserBaseModel
    actionType: any;
    count: number = -1;
    mainTransactionId: string;
    newTransactionId: string;
    groupList: Array<any>;
    permissionList: Array<any>;
    roleList: Array<any>;
    groupRoles: Array<any>;
    groupXrefList: Array<any>;
    roleXrefList: Array<any>;
    transactionId: string;
    interests: string;
    userFullName: string;
    locationTypeCode: number;
    objectId: number;
    isSupervisor: boolean;
    oldPassword: string;
    indexUpdateFlag: boolean = true;
    sourceId: number;
    sourceDescription: string;
    sourceTypeCode: number;
    fullUserName: string;
    addressList: Array<any>;
    contactMethodList: Array<any>;
    userDetailModel: UserProfileDetailModel;
    fullPath: string;
}
