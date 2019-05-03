/**
 * Created Date: Wednesday, November 29th 2017, 02:16:16 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

import { Pipe, PipeTransform } from '@angular/core';
import { CommonUtils } from '@platform/common/util/common-utils';
import * as _ from 'lodash';

@Pipe({ name: 'individualColumnFilter' })
export class IndividualColumnFilterPipe implements PipeTransform {
    transform(arr: Array<any>, filterKey: any, filterValue: any) {
        if (CommonUtils.isValueEmpty(filterKey) || CommonUtils.isValueEmpty(filterValue) || _.isEmpty(arr)) {
            return arr;
        }
        const matched = [];
        _.forEach(arr, element => {
            _.mapKeys(element, (value, key) => {
                if (
                    _.isEqual(key, filterKey) &&
                    _.lowerCase(_.toString(value)).indexOf(
                        _.lowerCase(_.toString(filterValue))
                    ) !== -1
                ) {
                    matched.push(element);
                }
            });
        });
        return matched;
    }
}
