/**
 * Created Date: Wednesday, December 6th 2017, 12:59:58 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { PermissionBaseModel } from '@platform/eaf-components/common/guard/permission-base.model';


export interface IPermissionGuardService<P extends PermissionBaseModel> {

    hasPermission(permissions: Array<P|string>|P|string): boolean;

    getPermissionDenyStyleClass(): string;
}
