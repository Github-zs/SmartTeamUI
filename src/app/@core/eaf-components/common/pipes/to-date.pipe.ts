/**
 * Created Date: Friday, September 22nd 2017, 12:57:38 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'to_date' })
export class ToDatePipe implements PipeTransform {
  transform(val: any, formatPattern: string): any {
    if (val == null) {
      return null
    };
    let date = val;
    if (typeof val === 'string' && (-1 === val.indexOf('-'))) {
        date = new Date(Number.parseInt(val));
    } else if (typeof val.getMonth === 'function') {
        date = val;
    }
    return moment.utc(date).format(formatPattern || 'YYYY-MM-DD');
  }
}
