/**
 * Created Date: Tuesday, July 4th 2017, 4:03:50 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'demoPipe' })
export class DemoPipe implements PipeTransform {
  transform(val: any): any {
    // It is just a demo
    return val;
  }
}
