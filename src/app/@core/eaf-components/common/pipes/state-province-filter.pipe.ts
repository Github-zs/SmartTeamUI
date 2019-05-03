/**
 * Created Date: Friday, September 22nd 2017, 1:50:02 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stateProvinceFilter' })
export class StateProvinceFilterPipe implements PipeTransform {
  transform(list, parentId): any {
    const newlist = [];
    for (let i = list.length - 1; i >= 0; i--) {
        if (list[i].parentId === parentId || list[i].parentId === -1) {
            newlist.push(list[i]);
        }
    }
    return newlist.sort(function(a, b){
        return a.parentId - b.parentId;
    });
  }
}
