/**
 * Created Date: Wednesday, December 6th 2017, 4:53:40 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Injectable, Inject } from '@angular/core';
import { Permission } from '@platform/common/constants/permissions.eum';
import { CommonUtils } from '@platform/common/util/common-utils';
import { AuthGuard } from '@platform/eaf-components/common/guard/auth.guard';
import { Oauth2TokenModel } from '@platform/eaf-components/common/guard/oauth2-token.model';
import { IPermissionGuardService } from '@platform/eaf-components/common/guard/permission-guard.service.interface';
import { PermissionModel } from '@platform/eaf-components/common/model/common/permission.model';
import { UserModel } from '@platform/eaf-components/common/model/user-access/user.model';
import * as _ from 'lodash';

@Injectable()
export class PermissionGuardService implements IPermissionGuardService<PermissionModel> {

    constructor(@Inject('AuthGuard') private authGuard: AuthGuard<UserModel, Oauth2TokenModel>) {}

    hasPermission(requiredPermissions: Array<PermissionModel|string> | PermissionModel | string): boolean {
        let requiredPermissionList: any = [];
        if (!_.isArray(requiredPermissions)) {
            requiredPermissionList = [requiredPermissions];
        } else {
            requiredPermissionList = requiredPermissions;
        }
        
        let userPermissions: PermissionModel[] = [];
        if(this.authGuard.getCurrentUser()) {
            userPermissions = this.authGuard.getCurrentUser().permissionList;
        }

        if (!_.isEmpty(_.find(userPermissions, {permissionName: Permission.ALL_PERMISSION}))) {
            // No need to check permission if user has all permission
            return true;
        }
        let isAllAuthority = true;
        _.each(requiredPermissionList, (rawRequiredPermission: PermissionModel|string) => {
            let requiredPermission = null;
            if (_.isString(rawRequiredPermission)) {
                requiredPermission = new PermissionModel(rawRequiredPermission.toString());
            } else {
                requiredPermission = rawRequiredPermission;
            }
            // Iterate all required permission to check if all required permission have satisified
            const matchedPermission: PermissionModel = _.find<PermissionModel>(userPermissions, (userPermission: PermissionModel) => {
                if (userPermission.permissionName === requiredPermission.permissionName) {
                    if (!CommonUtils.isValueEmpty(requiredPermission.subjectId) && !CommonUtils.isValueEmpty(userPermission.subjectId) && requiredPermission.subjectId !== userPermission.subjectId) {
                        return false;
                    } else {
                        return true;
                    }
                }
            });

            if (_.isEmpty(matchedPermission)) {
                // Check failed for one required permission, need to mark all check failed
                isAllAuthority = false;
            }
        });

        return isAllAuthority;
    }

    getPermissionDenyStyleClass(): string {
        return 'permission-deny';
    }
}
