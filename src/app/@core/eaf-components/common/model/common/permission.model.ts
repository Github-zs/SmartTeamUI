/**
 * Created Date: Wednesday, October 25th 2017, 10:32:02 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { PermissionBaseModel } from '@platform/eaf-components/common/guard/permission-base.model';

export class PermissionModel extends PermissionBaseModel {
    public permissionId: number;

    public permissionDesc: string;

    public isActive: boolean;

    public transactionId: number;

    constructor(permissionName?: string) {
        super();
        this.permissionName = permissionName;
    }
}
