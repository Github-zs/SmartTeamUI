/**
 * Created Date: Friday, September 22nd 2017, 1:18:35 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'to_time' })
export class ToTimePipe implements PipeTransform {
  transform(val: any, formatPattern: string): any {
    if (val == null) {
      return null
    }
    let time = null;
    // Handle the time formatted string
    if (typeof val === 'string' && val.indexOf('SSS') > -1) {
      time = moment.utc(val, 'hh:mm:ss.SSS').toDate();
    } else if (typeof val === 'string' && val.indexOf(':') > -1) {
      time = moment.utc(val, 'hh:mm:ss').toDate();
    } else if (typeof val.getMonth === 'function') {
      time = val;
    } else {
      time = new Date(Number.parseInt(val));
    }
    if (formatPattern) {
      return moment.utc(time).format(formatPattern || 'HHmm');
    } else {
      return time.getTime();
    }
  }
}
