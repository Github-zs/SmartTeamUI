/**
 * Created Date: Friday, June 30th 2017, 12:11:57 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ClickOutsideDirective } from '@platform/eaf-components/common/directive/click-outside-directive/click-outside.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ClickOutsideDirective
    ],
    exports: [
        ClickOutsideDirective
    ]
})
export class ClickOutsideModule {
}
