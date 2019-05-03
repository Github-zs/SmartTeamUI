/**
 * Created Date: Tuesday, October 24th 2017, 9:27:51 pm
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */

export class GlobalFilterModel {
  fromDate: string;
  toDate: string;
  dataType: string;
  myself: boolean;
  group: boolean;
  everyone: boolean;
  group_selected: Array<string>;
  groupList: Array<number>;
  task_status: Array<string>;
  workflow: Array<string>;
  due_date_status: Array<string>;
  change_items: Array<string>;
}
