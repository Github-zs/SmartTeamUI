import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'roleNameFilter'
})
export class RoleNameFilterPipe implements PipeTransform {
  transform(items: any[], filter: String): any {
    if (!items) {
      return [];
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    if (filter) {
        return items.filter(item => item.roleName
                    .toLowerCase()
                    .indexOf(filter.toLowerCase()) > -1);
    } else {
        return items;
    }
  }
}
