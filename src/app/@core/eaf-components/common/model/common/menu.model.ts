/**
 * Created Date: Thursday, September 21st 2017, 12:48:36 am
 * Author: KSC
 * Copyright (c) 2017 Kingland System Corporation. All Rights Reserved
 */
export class MenuModel {
  category: string;
  obj: {};
  subList: Array<object>;
  order: number;
  hasSubList: boolean = false;
  className: string;

  /**
   * Creates an instance of MenuModel.
   *
   * @param {string} [category]
   * @param {object} [obj]
   * @param {number} [order]
   * @memberof MenuModel
   */
  constructor(category?: string, obj?: {}, order?: number, className?: string) {
    this.category = category;
    this.obj = obj;
    this.order = order;
    this.className = className;
  }

  /**
   * Add object to sub list
   *
   * @param {object} obj
   * @memberof MenuModel
   */
  addSubList(obj: {}) {
    if (!this.subList) {
      this.subList = new Array<{}>();
    }
    this.subList.push(obj);
    this.hasSubList = true;
  }
}
