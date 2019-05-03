/**
 * Created Date: Tuesday, November 28th 2017, 5:16:40 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({ name: 'orderBy', pure: false })
export class OrderByPipe implements PipeTransform {
    transform(array: any[], field: string): any[] {
        if (_.isEmpty(array)) {
            return [];
        }
        array.sort((a: any, b: any) => {
            if (a[field] > b[field]) {
                return 1;
            } else if (a[field] < b[field]) {
                return -1;
            } else {
                return 0;
            }
        });
        return array;
    }
}
