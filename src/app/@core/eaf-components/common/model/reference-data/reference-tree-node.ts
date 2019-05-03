/**
 * Created Date: Tuesday, January 16th 2018, 12:47:13 am
 * Author: KSC
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */
import { CommonTreeNode } from '@platform/eaf-components/common/model/common/common-tree-node';

export class ReferenceTreeNode extends CommonTreeNode {
  category: string = null;
  key?: string = null;
  displayKey: string = null;
  description: string = null;
  isActive: boolean = true;
  displayOrder?: number;
  transactionId?: string = null;
  parentId?: number = null;
  isSystemManaged: boolean = false;
  additionalAttributes?: any;
  text?: string = null;
  isRootCategory: boolean = false;
  isAdded?: boolean = false;
  isAlphaOrdered?: boolean = false;
  mainTransactionId?: string = null;
  constructor() {
      super();
  }
}
