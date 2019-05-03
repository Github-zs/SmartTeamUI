/**
 * Created Date: Tuesday, December 26th 2017, 03:10:56 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import {Router} from '@angular/router';
import { CommonUtils } from '@platform/common/util/common-utils';
import * as _ from 'lodash';

export class BreadCrumbsBaseComponent {

    constructor(protected router: Router) {}

    /**
     * navigate
     *
     * @author edqin
     * @param {any} $event
     * @memberof BreadCrumbsBaseComponent
     */
    onNavigate($event) {
        if (_.isEmpty($event) || CommonUtils.isValueEmpty($event.url)) {
            return;
        }
        if (_.isEmpty($event.params)) {
            this.router.navigate([$event.url]);
        } else {
            this.router.navigate([$event.url], $event.params);
        }
    }
}
