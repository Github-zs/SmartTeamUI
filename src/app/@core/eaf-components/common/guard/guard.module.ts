/**
 * Created Date: Wednesday, December 6th 2017, 12:52:57 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionGuardDirective } from '@platform/eaf-components/common/guard/permission-guard.directive';
import { IPermissionGuardService } from '@platform/eaf-components/common/guard/permission-guard.service.interface';
import { PermissionModel } from '@platform/eaf-components/common/model/common/permission.model';

@NgModule({
    imports: [CommonModule],
    declarations: [ PermissionGuardDirective],
    exports: [ PermissionGuardDirective]
})
export class GuardModule {
    static forRoot(
        permissionGuardService: IPermissionGuardService<PermissionModel>
    ): ModuleWithProviders {
        return {
            ngModule: GuardModule,
            providers: [
                {
                    provide: 'PermissionGuardService',
                    useValue: permissionGuardService
                }
            ]
        };
    }
}
