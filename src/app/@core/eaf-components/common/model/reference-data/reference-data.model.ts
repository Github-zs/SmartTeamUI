/**
 * Created Date: Wednesday, January 17th 2018, 04:15:23 pm
 * Author: KSC
 * Copyright (c) 2018 Kingland System Corporation. All Rights Reserved
 */

export class ReferenceDataModel {
    id: number;
    name: string;
    category: string = null;
    key: string = null;
    displayKey: string = null;
    description: string = null;
    isActive: boolean = true;
    displayOrder: number;
    transactionId: string = null;
    parentId: number;
    isSystemManaged: boolean = false;
    isRootCategory: boolean = false;
    additionalAttributes: string;
    text: string = null;
    mainTransactionId: string = null;
    changeTypeCode: number;
}
