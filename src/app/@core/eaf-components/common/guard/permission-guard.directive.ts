/**
 * Created Date: Wednesday, December 6th 2017, 12:57:46 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Directive, ElementRef, Inject, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { PermissionBaseModel } from '@platform/eaf-components/common/guard/permission-base.model';
import { IPermissionGuardService } from '@platform/eaf-components/common/guard/permission-guard.service.interface';
import * as _ from 'lodash';

@Directive({
    selector: '[permission-guard]'
})
export class PermissionGuardDirective implements OnChanges {
    // tslint:disable-next-line:no-input-rename
    @Input('permission-guard') required: Array<PermissionBaseModel|string> | PermissionBaseModel | string;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        @Inject('PermissionGuardService')private permissionGuardService: IPermissionGuardService<
            PermissionBaseModel
        >
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!_.isEmpty(changes.required) && changes.required.currentValue != null) {
            if (this.permissionGuardService.hasPermission(changes.required.currentValue)) {
                this.renderer.removeClass(this.el.nativeElement, this.permissionGuardService.getPermissionDenyStyleClass());
            } else {
                this.renderer.addClass(this.el.nativeElement, this.permissionGuardService.getPermissionDenyStyleClass());
            }
        } else {
            this.renderer.removeClass(this.el.nativeElement, this.permissionGuardService.getPermissionDenyStyleClass());
        }
    }
}
