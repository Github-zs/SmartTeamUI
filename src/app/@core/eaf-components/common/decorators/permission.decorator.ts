/**
 * Created Date: Wednesday, December 6th 2017, 7:16:59 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Permission } from '@platform/common/constants/permissions.eum';

export function PermissionDecorator(constructor: Function) {
    constructor.prototype.Permission = Permission;
}
