/**
 * Created Date: Wednesday, December 6th 2017, 1:11:04 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { PermissionModel } from '@platform/eaf-components/common/model/common/permission.model';

export class AuthReceiptBaseModel {
    username: string;
    password: string;
    oldPassword: string;
    permissionList: PermissionModel[]
}
