/**
 * Created Date: Sunday, July 16th 2017, 9:31:53 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { AuthReceiptBaseModel } from '@platform/eaf-components/common/guard/auth-receipt-base.model';
import { GroupModel } from '@platform/eaf-components/common/model/user-access/group.model';

export class UserModel extends AuthReceiptBaseModel {
    userId: number;
    answerOne: string;
    isActive: boolean;
    answerTwo: string;
    isLocked: boolean;
    challengeOne: string;
    challengeTwo: string;
    email: string;
    firstName: string;
    lastName: string;
    userFullName: string;
    groupList: GroupModel[];
}
