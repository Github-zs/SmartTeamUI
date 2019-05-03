/**
 * Created Date: Wednesday, November 29th 2017, 02:16:16 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'individualColumnSort'})
export class IndividualColumnSortPipe implements PipeTransform {
    transform(records: Array<any>, field: string): any {
        if (!records) {
            return records;
        }
        records.sort(function (a, b) {
            if (_.lowerCase(a[field]) < _.lowerCase(b[field])) {
                return -1;
            } else if (_.lowerCase(a[field]) > _.lowerCase(b[field])) {
                return 1;
            } else {
                return 0;
            }
        });
        return records;
    };
}
