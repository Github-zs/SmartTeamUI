/**
 * Created Date: Friday, September 22nd 2017, 1:24:47 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bigNumber' })
export class BigNumberPipe implements PipeTransform {
  transform(inputNumberStr: string): any {
    if (inputNumberStr == null || inputNumberStr.length === 0) {
      return null;
    } else {
      return inputNumberStr.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
  }
}
